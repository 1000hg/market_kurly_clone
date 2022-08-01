import styles from "../css/MainNavbar.module.css";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";

function MainNavbar() {
  return (
    // <Navbar
    //   expand="lg"
    //   className="sticky-top"
    //   style={{ backgroundColor: "#fff" }}
    // >
    //   <Container fluid>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav
    //         className="me-auto my-2 my-lg-0"
    //         style={{ justifyContent: "space-around" }}
    //       >
    //         <NavDropdown title="전체 카테고리" id="basic-nav-dropdown">
    //           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.2">채소</NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.4">
    //             Separated link
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //         <Nav.Link href="#home">신상품</Nav.Link>
    //         <Nav.Link href="#link">베스트</Nav.Link>
    //         <Nav.Link href="#home">알뜰쇼핑</Nav.Link>
    //         <Nav.Link href="#link">특가/혜택</Nav.Link>
    //       </Nav>
    //       <Form className="d-flex">
    //         <Form.Control
    //           type="search"
    //           placeholder="Search"
    //           className="me-2"
    //           aria-label="Search"
    //         />
    //         <Button variant="outline-success">Search</Button>
    //       </Form>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>

    //
    <nav
      className="navbar sticky-top navbar-expand-lg"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{ justifyContent: "space-between" }}
        >
          <div style={{ flexGrow: 1 }}>
            <ul
              className="navbar-nav me-auto my-2 my-lg-0"
              style={{ justifyContent: "space-around" }}
            >
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  전체 카테고리
                </a>

                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                  styles={{ display: "block" }}
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      채소
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a
                  className={"nav-link " + `${styles.nvLnk}`}
                  aria-current="page"
                  href="#"
                >
                  신상품
                </a>
              </li>
              <li className="nav-item">
                <a className={"nav-link " + `${styles.nvLnk}`} href="#">
                  베스트
                </a>
              </li>
              <li className="nav-item">
                <a className={"nav-link " + `${styles.nvLnk}`} href="#">
                  알뜰쇼핑
                </a>
              </li>
              <li className="nav-item">
                <a className={"nav-link " + `${styles.nvLnk}`} href="#">
                  특가/혜택
                </a>
              </li>
            </ul>
          </div>

          <form className="d-flex styles.search-frm" role="search">
            <input
              className={"form-control me-2 " + `${styles.bdrNone}`}
              type="search"
              placeholder="검색어를 입력해주세요."
              aria-label="Search"
              style={{ marginLeft: "1rem" }}
            />
            <input
              type="image"
              src="https://res.kurly.com/pc/service/common/1908/ico_search_x2.png"
            />
          </form>

          <a className={styles.iconItm}>
            <svg
              style={{ width: "2rem", height: "2rem" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
            </svg>
          </a>
          <a className={styles.iconItm}>
            <svg
              style={{ width: "2rem", height: "2rem" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
            </svg>
          </a>
          <a className={styles.iconItm}>
            <svg
              style={{ width: "2rem", height: "2rem" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default MainNavbar;
