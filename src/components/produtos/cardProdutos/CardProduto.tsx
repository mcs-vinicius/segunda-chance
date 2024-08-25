
import { useContext } from 'react';
import { CartContext } from '../../../contexts/CartContext';
import { FavContext } from '../../../contexts/FavContext';
import Produto from '../../../models/Produto';
import "./CardProduto.css";
import { Heart } from '@phosphor-icons/react/dist/ssr/Heart';
import { Link } from 'react-router-dom';

interface CardProdutoProps {
  produto: Produto
}

function CardProduto({ produto }: CardProdutoProps) {
  var popupViews = document.querySelectorAll('.popup-view');
  var popupBtns = document.querySelectorAll('.popup-btn');
  var closeBtns = document.querySelectorAll('.close-btn');

  const { adicionarProduto } = useContext(CartContext)

  const { favoritarProduto } = useContext(FavContext)

  //javascript for quick view button
  var popup = function (popupClick: number) {
    popupViews[popupClick].classList.add('active');
  }
  popupBtns.forEach((popupBtn, i) => {
    popupBtn.addEventListener("click", () => {
      popup(i);
    });
  });
  //javascript for close button
  closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      popupViews.forEach((popupView) => {
        popupView.classList.remove('active');
      });
    });
  });


  return (
    <div>
      <div className="product">
        <div className="product-card">
          <h2 className="name">{produto.nomeProduto}</h2>
          <span className="price">R$ {produto.preco}</span>
          <button className="popup-btn" id="bt-visualizar">Visualizar</button>
          <img src={produto.foto} className="product-img" alt="" />
        </div>
        <div className="popup-view">
          <div className="popup-card">
            <a><i className="fas fa-times close-btn"></i></a>
            <div className="product-img flex flex-col-reverse w-full h-full">
              <img src={produto.foto} alt="" />
              <Link className=' absolute -mt-96 -ml-80' onClick={() => favoritarProduto(produto)} to={''} >
                <Heart size={20} />
              </Link>

            </div>
            <div className="info">
              <h2>{produto.nomeProduto}<br /><span>{produto.categoria?.nomeCategoria}</span></h2>
              <p>{produto.descricao}</p>
              <span className="price">R$ {produto.preco}</span>
              <button className="buttonn m-auto" onClick={() => adicionarProduto(produto)}>
                <span className="button_t_text">Add Item</span>
                <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardProduto