import Link from "next/link"
import Image from "next/image"
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Navigation() {

  const warenkorbAnzahl = useSelector((state) => state.warenkorb.warenkorbAnzahl)
    return (
      <div className="shadow sticky-top p-2 mb-2 bg-danger">
        <div className="d-flex justify-content-between align-items-center">
        <Link href="/">
            <Image src={'/logo_burger.png'} alt='logo' width={75} height={75} />
        </Link>
        <Link href="/warenkorb">
          {warenkorbAnzahl > 0 ? (
            <>
              <Image src={'/cart.png'} alt='warenkorb' width={75} height={75} />
              <Badge pill bg="success" style={{position: "absolute", right: "10px", top: "15px"}} >{warenkorbAnzahl}</Badge>
            </>
          ) : (
            <Image src={'/cart.png'} alt='warenkorb' width={75} height={75} />
          )}
        </Link>
        </div>
      </div>
    );
}
  