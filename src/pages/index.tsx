import Image from "next/image";
import localFont from "next/font/local";
import pokedexLat from '../../public/assets/PokedexLateral.jpg'
import pokedex from '../../public/assets/Pokedex.jpg'
import pokedexLatdir from '../../public/assets/PokedexLateraldir.jpg'
import semFoto from '../../public/assets/SemFoto.jpg'
import { useState } from "react";
import { url } from "inspector";
import { stringify } from "querystring";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import { isUndefined } from "util";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const style = 'h-9 w-[141px] rounded-md text-white bg-[#515453] hover:bg-[#2C302E] '
  
  const [tipos,setTipos] = useState<any>() //armazenará apenas objetos
  const [id = 1,setId] = useState<number>()
  const [lastid,setLastid] = useState<number>(1)
  var ids : number = id
  const [list,setList] = useState<any>() //armazenará apenas objetos 
// `https://pokeapi.co/api/v2/pokemon/${id}/`
  const [loading= false,setLoading] = useState<boolean>()
  const [int = [1,1,1],setInt] = useState<any>() // armazenará apenas objetos
  
    useEffect(() => {
    Definirpkm(id.toString())

    },[])

    useEffect(() => {
      Definirpkm(ids.toString())
    },[id])

    useEffect(() => {
      setId(list?.id)
    },[int])

   
    useEffect(() => {
      let tipo1 : any = document.getElementById("tipo1")
      let tipo2 : any = document.getElementById("tipo2")
      let cor1 = definircor(tipo1?.innerHTML)
      let cor2 = definircor(tipo2?.innerHTML)
      
      if (tipo2.innerHTML == ''){
      tipo2.style.display = 'none'
      tipo2.style.marginLeft = '0px'
      }else {
      tipo2.style.display = 'inline'
      tipo2.style.marginLeft = '12px'  
      
      }

      tipo1.style.backgroundColor = cor1
      tipo2.style.backgroundColor = cor2

      tipo2?.setAttribute("background-color", cor2)
      

    },[int])

    function definircor(text:string | undefined) {
      let cor : string = ''
      text == 'bug' ? cor = "#A8B91E" : 
      text == 'dark' ? cor = "#4F382E" :
      text == 'dragon' ? cor = "#725DDF" :
      text == 'electric' ? cor = '#F7B211' : 
      text == 'fairy' ? cor = "#F3ACF3" :
      text == 'fighting' ? cor = "#7F331B" : 
      text == 'fire' ? cor = "#E73B0A" :
      text == 'flying' ? cor = "#8BA0EF" : 
      text == 'ghost' ? cor = "#5E60B1" :
      text == 'grass' ? cor = "#6BBE30" : 
      text == 'ground' ? cor = "#CBAD50" :
      text == 'ice' ? cor = "#A2E5FD" : 
      text == 'normal' ? cor = "#C5C0B5" :
      text == 'poison' ? cor = "#964796" : 
      text == 'psychic' ? cor = "#E6457D" :
      text == 'rock' ? cor = "#B49D53" : 
      text == 'steel' ? cor = "#B5B5C3" :
      text == 'water' ? cor = "#3698FB" : cor = ''


      return(cor)
    }

    function pesquisarpkm() {
      let tag :any = document.getElementById('valorpesq')
      let valor = tag.value
      Definirpkm(valor)
    }

    async function Diminuir() {
      if (id > 1 ){
       setId(id-1)}}

    async function Aumentar() {
      setId(id+1)
      // ids = ids + 1
      // Definirpkm(ids.toString())
    }
    
    async function  Definirpkm(identf:string) {
      let sprite : any

     
      let conec = await fetch(`https://pokeapi.co/api/v2/pokemon/${identf}/`).then((response) => {return(response.json())})
      setList(conec)
      sprite = (Object.values(conec?.sprites?.other))
      sprite = sprite[2]
      sprite = sprite.front_default
      setInt(sprite)
      }



    function mostrarlista() {
    console.log(id)//verificar os valores dentro de listan
    }



   
  return (
    
   <div className="flex bg-[#F4F1DE] relative w-full justify-center items-center h-[100vh]">
    <Image src={pokedexLat} alt='pokedex lateral' width={200} className="h-[700px] rounded-s-3xl"></Image>
    <Image src={pokedex} alt="pokedex" width={400}  className='h-[700px]'></Image>    
    <div className=" flex   h-[300px] absolute left-[33%]">
      <Image id="pkmimg" className="w-[300px] h-[300px]" src={int} width={300} height={300} alt="Pokemon"></Image>
      </div>
      
      <div className="bg-white flex justify-center items-center border-2 border-[#b4e0e5] w-28 h-14 top-[70%] left-[39.3%] absolute">
        <p className="text-5xl font-medium mb-2">{list?.id}</p>  {/* id */}
      </div>
    <div className="w-[400px] -ml-1 rounded-e-3xl relative h-[700px] bg-[#C3172B]">
      <div className="border-black w-full mt-[49px] border-2"></div>
      <div className=" w-[100%] flex justify-center items-center m-auto mt-4 h-10"> {/* pesquisa */}
        <input id='valorpesq' className=" text-2xl h-full w-[50%] font-medium"  type="text" />
        <button onClick={() => {pesquisarpkm()}} className="w-[20%] bg-[#515453] ml-2 rounded-lg h-full text-white hover:bg-[#2C302E]">Pesquisar</button>
      </div> 
      <div className="h-full absolute w border-black border-2 -top-[0px]"></div>

      {/* dados */}
      <div className="text-center bg-white w-72 h-96 border-4 border-slate-200 absolute top-[20%] left-[14%]">
      <p className="mt-3 text-3xl ">{list?.name}</p> {/* Nome */}
      <div className="flex mt-3 justify-center items-center">
          <p id="tipo1" className="pt-1 pb-2.5 text-white px-3 rounded-xl flex justify-center items-center text-2xl">{(list?.types[0])?.type?.name}</p>
          <p id="tipo2" className=" ml-3 pt-1 pb-2.5 text-white px-3 rounded-xl flex justify-center items-center text-2xl">{(list?.types[1])?.type?.name}</p>
      </div>
      <p className="mt-3 text-xl">{(list?.height / 10).toFixed(2)} metros</p>
      <p className="mt-2 text-xl">{(list?.weight / 10).toFixed(2)} kg</p>
      </div>
      <div> {/* FORMAS */}
        {/* fazer com map*/}


      </div>


    {/* butões */}
      <div className=" border flex justify-center items-center border-transparent w-96 h-10 absolute left-[2%] top-[78%]">
        <button onClick={Diminuir} className={style}>{'<'}</button>
        <button onClick={Aumentar} className={style + "ml-3"} >{'>'}</button>
      </div>

      <div className="border-black w-full mt-[540.5px] border-2"></div>
    </div>
   </div>
  );
  }