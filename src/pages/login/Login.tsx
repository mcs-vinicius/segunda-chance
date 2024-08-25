import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import UsuarioLogin from "../../models/UsuarioLogin";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { usuario, handleLogin, isLoading } = useContext(AuthContext);
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home");
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <>
      <div className="body-login">
        <div className="login-box md-10">
          <h2>Login</h2>
          <form onSubmit={login}>

            {/* Usuario */}
            <div className="user-box">
              <input type="e-mail" id="usuario" name="usuario" value={usuarioLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
              <label className=" text-2xl" htmlFor="usuario">Usuario</label>
            </div>

            {/* Senha */}
            <div className="user-box">
              <input type="password" id="senha" name="senha" value={usuarioLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
              <label htmlFor="senha" >Senha</label>
            </div>

            {/* Ir para o Cadastro */}
            <div className="cadastro">
              <span >
                <Link to="/cadastro" className=" hover:underline ">
                  Cadastre-se
                </Link>
              </span>
            </div>

            <div className='h-2'></div>

            {/* button Entrar */}

            <button type='submit' className="buttonEntrar">
            <span></span>
              <span></span>
              <span></span>
              <span></span>
              {isLoading ? <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={false} /> :
                <p>Entrar</p>
              }
            
            </button>


          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
