import passport from 'passport';

// Applies the name ed strategy (or strategies) to the incoming request, in order to authenticate 
// the request. If authentication is successful, the user will be logged in and populated at req.user 
// and a session will be established by default. If authentication fails, an unauthorized response 
// will be sent.

// Options:

// session Save login state in session, defaults to true.
// successRedirect After successful login, redirect to given URL.
// successMessage True to store success message in req.session.messages, or a string to use as override message for success.
// successFlash True to flash success messages or a string to use as a flash message for success (overrides any from the strategy itself).
// failureRedirect After failed login, redirect to given URL.
// failureMessage True to store failure message in req.session.messages, or a string to use as override message for failure.
// failureFlash True to flash failure messages or a string to use as a flash message for failures (overrides any from the strategy itself).
// assignProperty Assign the object provided by the verify callback to given property.

// An optional callback can be supplied to allow the application to override the default manner in which authentication attempts are handled. The callback has the following signature, where user will be set to the authenticated user on a successful authentication attempt, or false otherwise. An optional info argument will be passed, containing additional details provided by the strategy's verify callback - this could be information about a successful authentication or a challenge message for a failed authentication. An optional status argument will be passed when authentication fails - this could be a HTTP response code for a remote authentication failure or similar.

export const requireAuth = passport.authenticate('jwt', { session: false });
