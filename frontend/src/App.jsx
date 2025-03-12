



import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CreateBooks from './pages/ListBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SellBook from './pages/SellBook';
import SalesReport from './pages/SalesReport';
import SellMultipleItems from "./pages/SellMultipleItems";
import ResetPasswordCard from './pages/ResetPasswordCard';
import Header from "../src/pages/Header";
import Dashboard from './pages/Dashboard';
import SearchItems from './pages/SearchItems';
import EmailSender from './pages/EmailSend';
import Contact from './pages/Contact'
import AboutUs from './pages/AboutUs';
import PendingSellers from "./pages/PendingSellers"

function Layout() {
  const location = useLocation();

  // Exclude Header for these routes
  const excludedRoutes = ['/', '/signup', '/reset-password'];

  return (
    <>
      {!excludedRoutes.includes(location.pathname) && <Header  />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/sales-report' element={<SalesReport />} />
        <Route path='/items/create' element={<CreateBooks />} />
        <Route path='/items/details/:id' element={<ShowBook />} />
        <Route path='/items/edit/:id' element={<EditBook />} />
        <Route path='/items/delete/:id' element={<DeleteBook />} />
        <Route path='/items/sell/:id' element={<SellBook />} /> 
        <Route path="/sell-multiple" element={<SellMultipleItems />} />
        <Route path="/user/reset-password" element={<ResetPasswordCard />} />
        <Route path="/search/:name" element={< SearchItems/>} />
        <Route path="/chat"element={<EmailSender />}/>
        <Route path="/contact"element={<Contact/>}/>
        <Route path="/aboutus"element={<AboutUs/>}/>
        <Route path="/PendingSellers"element={<PendingSellers/>}/>
       
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;




// import React from 'react';
// import { BrowserRouter, Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
// import Home from './pages/Home';
// import CreateBooks from './pages/ListBooks';
// import ShowBook from './pages/ShowBook';
// import EditBook from './pages/EditBook';
// import DeleteBook from './pages/DeleteBook';
// import Login from './pages/Login';
// import SignUp from './pages/SignUp';
// import SellBook from './pages/SellBook';
// import SalesReport from './pages/SalesReport';
// import SellMultipleItems from "./pages/SellMultipleItems";
// import ResetPasswordCard from './pages/ResetPasswordCard';
// import Header from "../src/pages/Header";
// import Dashboard from './pages/Dashboard';
// import SearchItems from './pages/SearchItems';
// import EmailSender from './pages/EmailSend';
// import Contact from './pages/Contact';
// import AboutUs from './pages/AboutUs';
// import PendingSellers from "./pages/PendingSellers";
// import { SnackbarProvider, useSnackbar } from 'notistack';

// function ProtectedRoute({ element, allowedRoles }) {
//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();
//   const navigate = useNavigate(); // Get navigate function
//   const userRole = localStorage.getItem('userRole'); // Retrieve user role
//   const isAuthorized = userRole && allowedRoles.includes(userRole);
//   const snackbarShownRef = React.useRef(false);

//   // Show snackbar notification if the user is not authorized
//   React.useEffect(() => {
//     if (!isAuthorized && !snackbarShownRef.current) {
//       snackbarShownRef.current = true;
//       enqueueSnackbar('Access Denied. Redirecting to Home...', {
//         variant: 'error',
//         autoHideDuration: 4000, // Auto hide in 4 seconds
//         action: (key) => (
//           <button
//             onClick={() => {
//               closeSnackbar(key);
//               navigate('/home'); // Redirect to Home page when Cancel is clicked
//             }}
//             style={{
//               background: 'transparent',
//               border: 'none',
//               color: '#fff',
//               cursor: 'pointer',
//               marginLeft: '8px',
//               fontWeight: 'bold'
//             }}
//           >
//             Cancel
//           </button>
//         ),
//       });

//       // Automatically redirect after 4 seconds
//       setTimeout(() => {
//         navigate('/home');
//       }, 4000);
//     }
//   }, [isAuthorized, enqueueSnackbar, closeSnackbar, navigate]);

//   if (!isAuthorized) {
//     return <Navigate to="/" replace />;
//   }
//   return element;
// }

// function Layout() {
//   const location = useLocation();
  
//   // Exclude Header for these routes
//   const excludedRoutes = ['/', '/signup', '/reset-password'];

//   return (
//     <>
//       {!excludedRoutes.includes(location.pathname) && <Header />}
//       <Routes>
//         <Route path='/' element={<Login />} />
//         <Route path='/signup' element={<SignUp />} />
//         <Route path='/home' element={<Home />} />
//         <Route path='/dashboard' element={<Dashboard />} />
//         <Route path='/sales-report' element={<SalesReport />} />
//         <Route path='/items/details/:id' element={<ShowBook />} />
//         <Route path='/items/sell/:id' element={<SellBook />} />
//         <Route path="/sell-multiple" element={<SellMultipleItems />} />
//         <Route path="/user/reset-password" element={<ResetPasswordCard />} />
//         <Route path="/search/:name" element={<SearchItems />} />
//         <Route path="/chat" element={<EmailSender />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/aboutus" element={<AboutUs />} />
//         <Route path="/PendingSellers" element={<PendingSellers />} />
        
//         {/* Protected Routes: Only users with 'admin' role can access these */}
//         <Route 
//           path='/items/create' 
//           element={
//             <ProtectedRoute 
//               element={<CreateBooks />} 
//               allowedRoles={['admin']} 
//             />
//           } 
//         />
//         <Route 
//           path='/items/edit/:id' 
//           element={
//             <ProtectedRoute 
//               element={<EditBook />} 
//               allowedRoles={['admin']} 
//             />
//           } 
//         />
//         <Route 
//           path='/items/delete/:id' 
//           element={
//             <ProtectedRoute 
//               element={<DeleteBook />} 
//               allowedRoles={['admin']} 
//             />
//           } 
//         />
//       </Routes>
//     </>
//   );
// }

// function App() {
//   return (
//     <SnackbarProvider maxSnack={3}>
//       <BrowserRouter>
//         <Layout />
//       </BrowserRouter>
//     </SnackbarProvider>
//   );
// }

// export default App;
