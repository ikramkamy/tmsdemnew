import React, { useState,useEffect } from 'react';
import  './carton.css';
import { FaArrowCircleLeft, FaMinus, FaPlus, FaTrash} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useForceUpdate from 'use-force-update';

const Carton=(props)=>{
const{showVolum}=props;
const {handelCubage}=props;
const [i,setI]=useState("0");
const [room,setRoom]=useState([]);
const [tableau,setTableau]=useState([]);
const [control,setControl]=useState(false);
const[sommevol,setSommevol]=useState(0);
/************************************FORCE UPDATE*************************/
const forceUpdate = useForceUpdate();
const handleClick = () => {
  alert('I will re-render now.');
  forceUpdate();
};
const [input,setInput]=useState({
  name:"",
  tab:[],
  id:""
})
const handelroom=(event)=>{
const n=event.target.value;
 setInput({
name:n,
tab:[]
 })
}
//console.log("input",input);
const addtoroom=()=>{
setRoom([...room,input]);
}
//console.log("Room",room);
const [input2,setInput2]=useState({
  name:"",
  volume:0,
  prix:0,
  quantite:0
});
/*************************************************/


const addelem=(e)=>{
//console.log('index of', room.indexOf(e) )
  for(let i=0 ; i<room.length;i++){
  if(room.indexOf(e)==room.indexOf(room[i])){
  e["tab"].push(input2)
}
}
forceUpdate();
}

/************************************** */
const handelelem=(event)=>{
const n=event.target.value;
setInput2({
 name:n.split(" ")[0],
 volume:n.split(" ")[1],
 prix:n.split(" ")[2],
 quantite:0
})
  }
//console.log("input",input2)
const qadd=(e,p)=>{
  p.quantite=Number(p.quantite)+1;
  console.log("la quantité",p.quantite)
  console.log("le volume",p.volume)
  setSommevol(sommevol+Number(p.volume));
  handelCubage(sommevol)
  forceUpdate();
}

//console.log("le volume total",sommevol);
/************************************ADD MINUS ELEM CUBAGE******************************/
const [q,setQ]=useState(0);
const qminus=(p)=>{
if(p.quantite==0){
  alert("la quantité est nulle")
}else{
  p.quantite=Number(p.quantite)-1;
  setSommevol(sommevol-Number(p.volume));
  //handelCubage(sommevol)
  forceUpdate();
}}
/*************************************LA SOMME DES VOLUMES*****************************/
/*
useEffect(()=>{
 handelCubage(sommevol)
})
*/
return(
<div className="carton">
<div className="calcul-carton">
<div className="text-carton">
  <div>
<h1>L'inventaire de votre déménagement</h1>
<p>Listez vos meubles pièce par pièce.</p>

<h4>Attention, ne pas oublier de compter le cabanon de jardin, la cave, le garage, le grenier et les cartons d'objets posés sur les meubles ou par terre !</h4>
</div>
{/*<div className="img-carton">
<img src="/images/carton.png" className="img-carton-size"/>
</div>*/}

</div>
<div className=" btn-add-room"  onClick={addtoroom}>Ajouter une piéce</div>
<div className="add-box">
<select className="select-la-piece" name="name" id="select" value={input.name} onChange={handelroom}>
                <option value="chambre">selectionner</option>
                <option value="chambre ">Chambre</option>
                <option value="Jardin" >Jardin</option>
                <option value="salon" >salon</option>
                <option value="cuisine">cuisine</option>
</select>
</div>
<h2>Les piéces selectionnées:</h2>
{room?.map((e)=>
<div className="wrap-room">
 <div className="title-wrap-room">
 <svg width="24" height="24" viewBox="0 0 24 24" color="#2c216f"><path d="M4,15V9H12V4.16L19.84,12L12,19.84V15H4Z" /></svg> 
   {e.name}</div> 
<select name="elem" value={e.tab} onChange={handelelem}  >
                <option value="selectionner 0 30">selectionner</option>
                <option value="table 1.5 30">table</option>
                <option value="chaise 0.5 30" >chaise</option>
                <option value="lit 2  30" >lit</option>
                <option value="carton 0.75 30">carton livre</option>
                <option value="carton 1 30">carton standard</option>
</select>
  <div className="wrap-elems-room">
    <div className="btns-wrap-room">
      
  <button  onClick={()=>addelem(e)} className="btn-add-room">Ajouter</button>
 
  </div>
      {e.tab?.map((p)=><div className="wrap-btns-cubage-elem">
      <div className="cubage-item-name" >
        
{p.name}</div>
      <button onClick={()=>qminus(p)}><FaMinus  className="cubage-icon"/></button>
      <div className="cubage-quantite">{p.quantite}</div>
      <button  onClick={()=>qadd(e,p)}><FaPlus className="cubage-icon"/></button>
  </div>)}


</div>

</div>)}

</div>

<div className="Total-carton">
<h1>Calcul du volume total</h1>
<div className="resultat-volume">

</div>
<h3>Le volume total:</h3>
<h3>{sommevol}m3</h3>
<div className="btn-carton">Continue</div>
<div className="btn-carton" >Retour</div>
</div>

    </div>)
}
export default Carton;