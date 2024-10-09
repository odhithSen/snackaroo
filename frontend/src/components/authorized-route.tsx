export const modul_name = "authorized-route.tsx";
// const withRoleAuthorization = (
//     Success,
//     allowedRoles,
//     Err,
//     onError,
//     onRedirecting,
//     returnTo
//   ) => {

//     function hoc({ user }) {
//       function arrContains(arr1, arr2) {
//         return arr1.some(item => arr2.includes(item))
//       }

//       // check if the array of roles for a user contains any of the roles for the allowed array
//       // for the page.
//       const usersRoles = user['http://mysite.com/roles']
//       if (!arrContains(usersRoles, allowedRoles)){
//         return (<Err />)
//       }
//       return (<Success user={user} />);
//     }
//     // https://auth0.github.io/nextjs-auth0/interfaces/frontend_with_page_auth_required.withpageauthrequiredoptions.html
//     return withPageAuthRequired(hoc, {onError, onRedirecting, returnTo})
//   }
