// import React from 'react'
// import { CiSquareInfo } from "react-icons/ci";
// import { MdDelete } from "react-icons/md";
// import { CiEdit } from "react-icons/ci";
// const BookTable=({books})=> {
//   return (
//    <table className='table table-striped text-center'>
//     <thead>
//         <tr>
//             <th className='border'> No</th>
//             <th className='border'> Title</th>
//             <th className='border'> Author</th>
//             <th className='border'> Publish year</th>
//             <th className='border'> Operations</th>
//         </tr>
//     </thead>
//     <tbody>
//         {books.map((books,index)=>(
//             <tr key={books._id} className='h-8'>
//                 <td className='border'>{index+1}</td>
//                 <td className='border'>{books.title}</td>
//                 <td className='border'>{books.author}</td>
//                 <td className='border'>{books.publishYear}</td>
//                 <td className='border'>
//                     <div className='flex justify-center gap-x-4'>
//                         <Link to={`/books/details/${books._id}`}>
//                         <CiSquareInfo className='mx-3'/>
//                         </Link>

//                         <Link to={`/books/edit/${books._id}`}>
//                         <CiEdit className='mx-3'/>
//                         </Link>

//                         <Link to={`/books/delete/${books._id}`}>
//                         <MdDelete/>
//                         </Link>
//                     </div>
//                 </td>
                
//             </tr>
//         ))}
//     </tbody>
//    </table>
//   )
// }

// export default BookTable



import React from 'react';
import { CiSquareInfo, CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const BookTable = ({ books }) => {
  return (
    <table className='table table-striped text-center'>
      <thead>
        <tr>
          <th className='border'>No</th>
          <th className='border'>Title</th>
          <th className='border'>Author</th>
          <th className='border'>Publish Year</th>
          <th className='border'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className='h-8'>
            <td className='border'>{index + 1}</td>
            <td className='border'>{book.title}</td>
            <td className='border'>{book.author}</td>
            <td className='border'>{book.publishYear}</td>
            <td className='border'>
              <div className='d-flex justify-content-center gap-3'>
                <Link to={`/books/details/${book._id}`}>
                  <CiSquareInfo className='mx-3' />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <CiEdit className='mx-3' />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdDelete />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
