import { Carousel } from "react-bootstrap";
import Image from "next/image";
import { Button } from "react-bootstrap";
import Link from "next/link";

export default function Slider() {
    return (
        <div className="shadow">
            <Carousel controls={false} fade={false} interval={2000} >
                <Carousel.Item>
                    <Image className="d-block w-100 rounded-3" src="/BilderSlider/tornadoflame_burger_kopie.jpg" alt="burger" width={3000} height={1000} layout="responsive"/>
                </Carousel.Item>
                <Carousel.Item>
                    <Image className="d-block w-100 rounded-3" src="/BilderSlider/pedo_burger_kopie.jpg" alt="pizza" width={3000} height={1000} layout="responsive"/>
                </Carousel.Item>
                <Carousel.Item>
                    <Image className="d-block w-100 rounded-3" src="/BilderSlider/harz4_burger_kopie.jpg" alt="burrito" width={3000} height={1000} layout="responsive"/>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}
