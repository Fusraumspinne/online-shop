import Slider from "../komponenten/Slider";
import Produkte from "../komponenten/Produkte";
import mongodb from "@/utils/mongodb";
import Produkt from "@/models/Produkt";
import {motion} from "framer-motion"

export default function Home({produkte}) {
  return (
    //<motion.div initial={{opacity: 0}} animate={{opacity: 1, rotate: 360}} transition={{type: "spring", stiffness: 50, repeat: Infinity}}>
    <motion.div initial={{y: -300}} animate={{y:0}} transition={{type: "spring", stiffness: 120}}>

      <Slider/>
      <Produkte produkte={produkte}/>
    </motion.div>
  );
}

export async function getServerSideProps(){
  await mongodb.dbConnect()
  const produkte = await Produkt.find({}).lean()
  return{
    props:{
      produkte: JSON.parse(JSON.stringify(produkte))
    }
  }
}