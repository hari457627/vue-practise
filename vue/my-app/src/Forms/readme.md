# Guidelines for solving the solution
- create a Nav bar and show the links Register , login 
- create success, fail, dashboard components
- maintain differrent forms i.e.., Register, Login forms
- Register form should consist name, desc, email, mobile
- validations should be added for registration and login fields, use events
- create mockable API's from mockable.io for posting the data and for login
- on success registration show success component saying profile registered, on fail show another message
- After registration, if user tries to login with registered credentials i.e.., email and mobile,if email and mobile matches in any of the record navigate to dashboard page
- Maintain the credentials in localstorage or session storage and pass the data through props to dashboard page
- after successfully logged in, on reloading default it should go to the dashboard page as the profile obj and boolean variable value is still true (i.e.., user doesn't logged out) and also nav bar should not consist login and register links. it should have Logout link.
- on successful logout, nav bar should consist register and login links
- pass login data to dashboard component by props through routing