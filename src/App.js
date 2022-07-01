import './App.css';
import Footer from './include/Footer';
import Header from './include/Header';
import MainPage from './main/index.js';
import ProductPage from './product';
import { Routes, Route } from 'react-router-dom'
import UploadPage from './upload';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
                          {/* 컴포넌트 이름으로 부르기 */}
        <Route path="/" element={<MainPage />} />
                          {/* id 로 받겠다 */}
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
