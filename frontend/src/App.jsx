import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './app.css'
import Root from '../Root'
import NRoot from '../Root'
import All from './pages/All/All'
import Business from './pages/Business/Business'
import Personal from './pages/Personal/Personal'
import Home from './pages/Home/Home'


const router = createBrowserRouter([{
  path:'/',
  element: <NRoot />,
  children:[
    { path:'/', element: <All />},
    { path:'/All', element: <All />},
    { path:'/business', element: <Business />},
    { path:'/personal', element: <Personal />},
    { path:'/home', element: <Home />},
  ]
}])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
