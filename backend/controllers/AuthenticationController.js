import { NeonDB } from "../db/pg_db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { usersTable } from "../schema/userSchema.js";
import { doesUserExist, getUserWithEmail } from "../operations/UserOperations.js";
import { AccessTokenSecret, RefreshTokenSecret } from "../config.js";

export const register = async (req, res) => {
    try {
        
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(422).json({ message: "Please fill all fields (name, email, password)" });
        }

        if(await doesUserExist(email)){
            return res.status(409).json({message:`User already exists with the email ${email}`})
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUserID = await DB.insert(usersTable).values({ name, email, password: hashPassword, role:role }).returning({id:usersTable.id,name:usersTable.name});
        
        return res.status(201).json({ message: "User Registered Successfully...", user_data:newUserID});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ message: "Please enter both email and password" });
        }

        if (await doesUserExist(email)) {
            const user = await getUserWithEmail(email);
            const passwordCheck = await bcrypt.compare(password, user.password);

            if (passwordCheck) {
                const accessToken = jwt.sign(
                    { userID: user.id, email:user.email, name:user.name, role:user.role },
                    AccessTokenSecret,
                    { subject: "accessAPI", expiresIn: "1h" }
                );

                const refreshToken = jwt.sign(
                    { userID: user.id, email:user.email, name:user.name, role:user.role },
                    RefreshTokenSecret,
                    { subject: "refreshToken", expiresIn: "1w" }
                ) 

                return res.status(200).json({ id: user.id, name: user.name, email: user.email, role:user.role, accessToken });
            } else {
                return res.status(401).json({ message: "Incorrect password. Please try again." });
            }
        }

        return res.status(401).json({ message: "User does not exist." });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const authenticatedRoute = async (req,res) => {
    try {
        const user = await getUserWithEmail(req.user.email);

        return res.status(200).json({
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


export const isAuthenticated = (req,res,next) => {
    const accessToken = req.headers.authorization;

    if(!accessToken){
        return res.status(401).json({message:"Access token not found..."})
    }

    try{
        const decodedAccessToken = jwt.verify(accessToken,AccessTokenSecret);
        req.user = {id:decodedAccessToken.userID,email:decodedAccessToken.email};
        next();
    }catch(error){
        return res.status(401).json({message:"Access token invalid or expired...."})
    }
}


export const authorize = (roles = []) => {
    return function name(req,res,next) {
        const user = jwt.verify(req.headers.authorization,AccessTokenSecret);
        console.log(user);
        if(!user || !roles.includes(user.role)){
            return res.status(403).json({message:"Access Denied"})
        }
        next();
    }
}

export const adminRoute = (req,res) => {
    return res.status(200).json({message:"Only admins and staff can access this route..."})
}