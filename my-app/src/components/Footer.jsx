import React from "react";

export default function Footer() {
  return (
    <div id="footer-wrapper">
      <footer id="footer" className="container">
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <section className="widget links">
                  <h3>Confiabilidad</h3>
                  <p>
                    Contamos con un sistema de reembolso, con un lapso de 3 días para su devolución, en caso de no recibir nada.
                  </p>
                </section>
              </div>

              <div className="col-sm">
                <section className="widget links">
                  <h3>Métodos de pago</h3>
                  <ul className="style2">
                    <li>
                      <img src="../images/mercadopago.png" alt="MercadoPago" />
                      <img src="../images/visa.png" alt="Visa" />
                      <img src="../images/paypal.webp" alt="Paypal" />
                    </li>
                  </ul>
                </section>
              </div>

              <div className="col-sm">
                <section className="widget contact last">
                  <h3>Contáctanos</h3>
                  <ul>
                    <li>
                      <a href="#" className="icon brands fa-twitter">
                        <span className="label">Twitter</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icon brands fa-facebook-f">
                        <span className="label">Facebook</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icon brands fa-instagram">
                        <span className="label">Instagram</span>
                      </a>
                    </li>
                  </ul>
                  <div className="form-group">
                    <label htmlFor="emails">Correo</label>
                    <input
                      type="email"
                      className="form-control"
                      id="emails"
                      aria-describedby="emailHelp"
                    />
                    <div id="emailError" className="fore-text"></div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
