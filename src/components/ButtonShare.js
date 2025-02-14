import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

// Para incluir o botão, basta chamar componente da seguinte forma:
// <ButtonShare path={ window.location.href } testid={ COLOCAR O TESTID QUE O REQUISITO PEDE } />
// Obs.: "window.location.href" pega a url toda da tela aberta. Exemplo: se está na página de perfil, vai copiar http://localhost:3000/perfil
// Se quiserem colocar um path diferente da tela aberta, como da tela de detalhes, pode-se fazer assim:
// const href = window.location.origin; ==> isso pega o http://localhost:3000 (ou como estiver aberto na máquina da pessoa)
// <ButtonShare path={ `${href}/comidas/${id}` } testid={ COLOCAR O TESTID QUE O REQUISITO PEDE } />
// Obs2.: Nesse caso, 'id' foi criado dinamicamente
// Dúvidas: Ana Clara

export default function ButtonShare(props) {
  const [isCopied, setIsCopied] = useState(false);
  const { path, testid } = props;

  useEffect(() => {
    if (isCopied) {
      const SECONDS = 2000;
      setInterval(() => { setIsCopied(false); }, SECONDS);
    }
  }, [isCopied]);

  const onClickButtonShare = () => {
    copy(path);
    setIsCopied(true);
  };

  return (
    <div
      style={ { display: 'flex' } }
      role="button"
      onKeyPress={ onClickButtonShare }
      onClick={ onClickButtonShare }
      tabIndex="0"
    >
      <img src={ shareIcon } alt="share icon" data-testid={ testid } />
      { isCopied && <p>Link copiado!</p>}
    </div>
  );
}

ButtonShare.propTypes = {
  path: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
};
