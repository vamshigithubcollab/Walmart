import React, { useState } from "react"
import {toast} from "react-toastify"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {shortestPath} from "./shortestPath";
import { places } from "../inputs/places";
import museumMain from '../inputs/images/innerImages/museum_main.jpg'
import {BiCurrentLocation, BiReset, BiArrowBack} from 'react-icons/bi'
import {GrLocationPin} from "react-icons/gr"
import {MdOutlineDirectionsWalk} from "react-icons/md"
import { useNavigate } from "react-router-dom";
import Dropdown1 from './Dropdown1';
import Dropdown2 from './Dropdown2';

let vertices = 13
let edges = 15
let graph = [
                [0,7,4],
                [0,6,2],
                [7,8,4],
                [8,9,1],
                [9,10,1],
                [10,6,1],
                [6,11,1],
                [11,10,2],
                [11,4,2],
                [4,12,1],
                [12,2,1],
                [12,3,2],
                [2,3,4],
                [2,1,2],
                [1,0,2]
            ]

export default function Navigation(){
    const navigate = useNavigate()


    const [placeDetails,setPlaceDetails] = useState({title: 'The MET Museum', content:'The Metropolitan Museum of Art, commonly known as The Met, is one of the largest and most comprehensive art museums in the world. Located in New York City, The Met\'s collection spans over 5,000 years of art from around the globe, with more than two million works of art in its permanent collection.The museum was founded in 1870 by a group of American citizens who wanted to create a national institution that would rival the great European museums. Today, The Met\'s collection includes masterpieces of painting, sculpture, and decorative arts from Europe, Asia, Africa, and the Americas, as well as extensive holdings of ancient Egyptian, Greek, and Roman art.    In addition to its impressive collection, The Met is renowned for its stunning architecture, which includes a mix of modern and classical styles. The museum also hosts a range of exhibitions and programs throughout the year, featuring some of the world\'s most renowned artists and thinkers. Whether you are an art lover, a history buff, or simply looking for a unique cultural experience, The Met is a must-see destination that offers something for everyone.',image:museumMain})
    const [source,setSource] = useState(null)
    const [destination,setDestination] = useState(null)

    function clearSourceAndDestination(){
        setSource(null)
        setDestination(null)
        setPlaceDetails({title: 'The MET Museum', content:'The Metropolitan Museum of Art, commonly known as The Met, is one of the largest and most comprehensive art museums in the world. Located in New York City, The Met\'s collection spans over 5,000 years of art from around the globe, with more than two million works of art in its permanent collection.The museum was founded in 1870 by a group of American citizens who wanted to create a national institution that would rival the great European museums. Today, The Met\'s collection includes masterpieces of painting, sculpture, and decorative arts from Europe, Asia, Africa, and the Americas, as well as extensive holdings of ancient Egyptian, Greek, and Roman art.    In addition to its impressive collection, The Met is renowned for its stunning architecture, which includes a mix of modern and classical styles. The museum also hosts a range of exhibitions and programs throughout the year, featuring some of the world\'s most renowned artists and thinkers. Whether you are an art lover, a history buff, or simply looking for a unique cultural experience, The Met is a must-see destination that offers something for everyone.',image:museumMain})
        
        let tar_ids = ['1-2','12-3','0-1','0-6','6-10','12-4','2-3','6-11','8-9','10-9','4-11','11-5','0-7','7-8','2-12','0-6']
        
        for(let i of tar_ids){
            document.getElementsByClassName(i)[0].setAttribute('stroke','#999999')
            if(i === '0-6'){
                document.getElementsByClassName(i)[1].setAttribute('stroke','#999999')
            }
        }
        for(let i = 0;i <= 12; i++){
            document.getElementById(i).setAttribute('fill','#00B2FF')
        }
    }

    function selectNodes(event){
        

        const title = places[event.target.id][event.target.id][0]
        const content = places[event.target.id][event.target.id][1]
        const image = places[event.target.id][event.target.id][2]

        setPlaceDetails({title: title,content: content,image: image})

        if(source !== null && destination !== null){
            toast.info('clear source and destination to select again')
        }

        else if(source === null){
            setSource(event.target.id)
            event.target.setAttribute('fill','#ff4d4d')
        }

        else{
            setDestination(event.target.id)
            event.target.setAttribute('fill','#ff4d4d')
        }
    }

    function getPath(){
        if(source !== null && destination !== null){
            
            const fetchedPath = (shortestPath(source,destination,vertices,edges,graph))
            const temp = []

            for(let i = 1; i < fetchedPath.length;i++){
                temp.push(parseInt(fetchedPath[i]))
                document.getElementById(fetchedPath[i]).setAttribute('fill','#ff8080')
            }            
            
            for(let i = 0;i < temp.length-1; i++){
                let tar_id = (temp[i]+'-'+temp[i+1])
                
                if(document.getElementsByClassName(tar_id).length === 0){
                    tar_id = (temp[i+1] + '-' + temp[i])
                }    

                let target_paths = document.getElementsByClassName(tar_id)
                for(let i = 0;i < target_paths.length; i++){
                        target_paths[i].setAttribute('stroke','black')
                        target_paths[i].setAttribute('stroke-width','3')
                    }
                    
            }
        }
    }

    return (
        <div className="navigation-container">

                <div className="details">
                    <img src={placeDetails.image} alt="" />
                    <h1>{placeDetails.title}</h1>
                    <div className="place-content">
                        <p>{placeDetails.content}</p>
                    </div>
                </div>

                <BiArrowBack className="back-icon" size = {19} />
                <button className = 'clearPath back' onClick = {() => navigate('/home')}>Back</button>

                
                    
                    <div className="from" >
                        
                    <Dropdown1></Dropdown1>
                    
                        <BiCurrentLocation className="label"/>
                        <input className = "location-inputs" id="sourcePlace" type="text" disabled value={source !== null? places[source][source][0] :'' } style={{margin:"10px",marginBottom:"10px"}}/>
                    </div>
                     <div className="to" style={{marginTop:"50px"}}>
                     <Dropdown2></Dropdown2>
                        <GrLocationPin className="label"/>
                        <input className = "location-inputs" id="destinationPlace" type="text" disabled value={destination !== null? places[destination][destination][0] : ''} style={{margin:"10px"}}/>
                    </div> 
                
                
                <div className="navigation-page" style={{marginTop:"100px"}}>
                    
                    <TransformWrapper  doubleClick={{ step: 0 }} maxScale={5} initialScale={1} initialPositionX={0} initialPositionY={0}>
                        <TransformComponent>
                        <svg width="1148" height="736" viewBox="0 0 1348 736" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_18_5)">
                            <path d="M1348 0H0V836H1348V0Z" fill="#E8E4DF"/>
                            <path d="M1090 674V690" stroke="#C9C8D0" stroke-width="2"/>
                            <path d="M669.5 603.5V564.5H699.5V600.5M669.5 603.5V606.5H699.5V603.5M669.5 603.5H667H699.5M699.5 600.5V603.5M699.5 600.5H702H667M699.5 603.5H702M667 597.5H702M702 594.5H667M667 591.5H702M702 588.5H667M667 585.5H702M702 582.5H667M667 579.5H702M702 576.5H667M667 573.5H702M702 570.5C702 570.5 679.497 570.5 667 570.5M667 567.5H702" stroke="#305B88" stroke-width="2"/>
                            <path d="M1087 675.357H1048V655.643H1084M1087 675.357H1090V655.643H1087M1087 675.357V677V655.643M1084 655.643H1087M1084 655.643V654V677M1087 655.643V654M1081 677V654M1078 654V677M1075 677V654M1072 654V677M1069 677V654M1066 654V677M1063 677V654M1060 654V677M1057 677V654M1054 654C1054 654 1054 668.788 1054 677M1051 677V654" stroke="#305B88" stroke-width="2"/>
                            <path d="M305.214 756.286V734H319.786V754.571M305.214 756.286V758H319.786V756.286M305.214 756.286H304H319.786M319.786 754.571V756.286M319.786 754.571H321H304M319.786 756.286H321M304 752.857H321M321 751.143H304M304 749.429H321M321 747.714H304M304 746H321M321 744.286H304M304 742.571H321M321 740.857H304M304 739.143H321M321 737.429C321 737.429 310.07 737.429 304 737.429M304 735.714H321" stroke="#305B88" stroke-width="0.9"/>
                            <path d="M283.143 756.286V734H296.857V754.571M283.143 756.286V758H296.857V756.286M283.143 756.286H282H296.857M296.857 754.571V756.286M296.857 754.571H298H282M296.857 756.286H298M282 752.857H298M298 751.143H282M282 749.429H298M298 747.714H282M282 746H298M298 744.286H282M282 742.571H298M298 740.857H282M282 739.143H298M298 737.429C298 737.429 287.713 737.429 282 737.429M282 735.714H298" stroke="#305B88" stroke-width="0.9"/>
                            <path d="M628.571 476.071V464H635.429V475.143M628.571 476.071V477H635.429V476.071M628.571 476.071H628H635.429M635.429 475.143V476.071M635.429 475.143H636H628M635.429 476.071H636M628 474.214H636M636 473.286H628M628 472.357H636M636 471.429H628M628 470.5H636M636 469.571H628M628 468.643H636M636 467.714H628M628 466.786H636M636 465.857C636 465.857 630.856 465.857 628 465.857M628 464.929H636" stroke="#305B88" stroke-width="0.5"/>
                            <path d="M902.571 261.643V244H909.429V260.286M902.571 261.643V263H909.429V261.643M902.571 261.643H902H909.429M909.429 260.286V261.643M909.429 260.286H910H902M909.429 261.643H910M902 258.929H910M910 257.571H902M902 256.214H910M910 254.857H902M902 253.5H910M910 252.143H902M902 250.786H910M910 249.429H902M902 248.071H910M910 246.714C910 246.714 904.856 246.714 902 246.714M902 245.357H910" stroke="#305B88" stroke-width="0.5"/>
                            <path d="M902.571 327.643V310H909.429V326.286M902.571 327.643V329H909.429V327.643M902.571 327.643H902H909.429M909.429 326.286V327.643M909.429 326.286H910H902M909.429 327.643H910M902 324.929H910M910 323.571H902M902 322.214H910M910 320.857H902M902 319.5H910M910 318.143H902M902 316.786H910M910 315.429H902M902 314.071H910M910 312.714C910 312.714 904.856 312.714 902 312.714M902 311.357H910" stroke="#305B88" stroke-width="0.5"/>
                            <path d="M733.571 476.071V464H740.429V475.143M733.571 476.071V477H740.429V476.071M733.571 476.071H733H740.429M740.429 475.143V476.071M740.429 475.143H741H733M740.429 476.071H741M733 474.214H741M741 473.286H733M733 472.357H741M741 471.429H733M733 470.5H741M741 469.571H733M733 468.643H741M741 467.714H733M733 466.786H741M741 465.857C741 465.857 735.856 465.857 733 465.857M733 464.929H741" stroke="#305B88" stroke-width="0.5"/>
                            <path d="M563.714 601.429H586V594.571H565.429M563.714 601.429H562V594.571H563.714M563.714 601.429V602V594.571M565.429 594.571H563.714M565.429 594.571V594V602M563.714 594.571V594M567.143 602V594M568.857 594V602M570.571 602V594M572.286 594V602M574 602V594M575.714 594V602M577.429 602V594M579.143 594V602M580.857 602V594M582.571 594C582.571 594 582.571 599.144 582.571 602M584.286 602V594" stroke="#305B88" stroke-width="0.5"/>
                            <path d="M629.286 425.429H646V418.571H630.571M629.286 425.429H628V418.571H629.286M629.286 425.429V426V418.571M630.571 418.571H629.286M630.571 418.571V418V426M629.286 418.571V418M631.857 426V418M633.143 418V426M634.429 426V418M635.714 418V426M637 426V418M638.286 418V426M639.571 426V418M640.857 418V426M642.143 426V418M643.429 418C643.429 418 643.429 423.144 643.429 426M644.714 426V418" stroke="#305B88" stroke-width="0.5"/>
                            <path d="M641.954 161.013L669.97 189.03L679.554 179.446L653.692 153.585M641.954 161.013L639.799 158.858L649.382 149.275L651.537 151.43M641.954 161.013L641.155 161.812L651.537 151.43M653.692 153.585L651.537 151.43M653.692 153.585L654.491 152.786L643.31 163.967M651.537 151.43L652.336 150.631M645.465 166.122L656.646 154.941M658.801 157.096L647.62 168.277M649.776 170.432L660.956 159.252M663.111 161.407L651.931 172.588M654.086 174.743L665.267 163.562M667.422 165.717L656.241 176.898M658.396 179.053L669.577 167.872M671.732 170.027L660.551 181.208M662.706 183.363L673.887 172.182M676.042 174.337C676.042 174.337 668.853 181.526 664.861 185.518M667.016 187.673L678.197 176.493" stroke="#305B88"/>
                            <path d="M694.757 109.341L722.97 137.554L732.554 127.97L706.511 101.928M694.757 109.341L692.587 107.171L702.171 97.5872L704.341 99.7574M694.757 109.341L693.959 110.14L704.341 99.7574M706.511 101.928L704.341 99.7574M706.511 101.928L707.31 101.129L696.129 112.31M704.341 99.7574L705.14 98.9588M698.299 114.48L709.48 103.299M711.65 105.469L700.469 116.65M702.64 118.82L713.82 107.64M715.991 109.81L704.81 120.991M706.98 123.161L718.161 111.98M720.331 114.15L709.15 125.331M711.32 127.501L722.501 116.321M724.672 118.491L713.491 129.672M715.661 131.842L726.842 120.661M729.012 122.831C729.012 122.831 721.823 130.02 717.831 134.012M720.001 136.182L731.182 125.001" stroke="#305B88"/>
                            <path d="M667.011 99.9688L638.799 128.182L648.382 137.765L674.425 111.723M667.011 99.9688L669.182 97.7986L678.765 107.382L676.595 109.552M667.011 99.9688L666.213 99.1702L676.595 109.552M674.425 111.723L676.595 109.552M674.425 111.723L675.223 112.521L664.043 101.34M676.595 109.552L677.394 110.351M661.872 103.511L673.053 114.691M670.883 116.862L659.702 105.681M657.532 107.851L668.713 119.032M666.543 121.202L655.362 110.021M653.192 112.192L664.372 123.372M662.202 125.543L651.021 114.362M648.851 116.532L660.032 127.713M657.862 129.883L646.681 118.702M644.511 120.872L655.691 132.053M653.521 134.223C653.521 134.223 646.333 127.035 642.34 123.043M640.17 125.213L651.351 136.394" stroke="#305B88"/>
                            <path d="M629.286 448.429H646V441.571H630.571M629.286 448.429H628V441.571H629.286M629.286 448.429V449V441.571M630.571 441.571H629.286M630.571 441.571V441V449M629.286 441.571V441M631.857 449V441M633.143 441V449M634.429 449V441M635.714 441V449M637 449V441M638.286 441V449M639.571 449V441M640.857 441V449M642.143 449V441M643.429 441C643.429 441 643.429 446.144 643.429 449M644.714 449V441" stroke="#305B88" stroke-width="0.5"/>
                            <path d="M118.714 124.571V145H127.286V126.143M118.714 124.571V123H127.286V124.571M118.714 124.571H118H127.286M127.286 126.143V124.571M127.286 126.143H128H118M127.286 124.571H128M118 127.714H128M128 129.286H118M118 130.857H128M128 132.429H118M118 134H128M128 135.571H118M118 137.143H128M128 138.714H118M118 140.286H128M128 141.857C128 141.857 121.571 141.857 118 141.857M118 143.429H128" stroke="#305B88" stroke-width="0.5"/>
                            <path d="M312.714 125.571V146H321.286V127.143M312.714 125.571V124H321.286V125.571M312.714 125.571H312H321.286M321.286 127.143V125.571M321.286 127.143H322H312M321.286 125.571H322M312 128.714H322M322 130.286H312M312 131.857H322M322 133.429H312M312 135H322M322 136.571H312M312 138.143H322M322 139.714H312M312 141.286H322M322 142.857C322 142.857 315.571 142.857 312 142.857M312 144.429H322" stroke="#305B88" stroke-width="0.5"/>
                            <path d="M916.5 418V406H950M954 406H980M991 406H1022M1027 406H1060M1060 406H1069M1060 406V417M1074 406H1082M1082 406H1090M1082 406V416M1082 416V417M1082 416H1090M916.5 448V459M916.5 459V460M916.5 459H950M954 459H986M991 459H1022M1027 459H1060M1060 459H1061M1060 459V450M1084 449H1090M1082 452V473M1082 473V483M1082 473H1090M1082 484V483M1082 483H1090" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M1082 459H1090" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M1082 452V449M1082 449V448M1082 449H1084" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M842 416.5H877M881 416.5H888M888 389H881M877 389H842" stroke="#C7CAD2"/>
                            <path d="M779.5 463.5H767.5V466.5H760.5V463.5H748" stroke="#C7CAD2"/>
                            <path d="M745 273V250M745 250V229M745 250H768M781 250V255V209M781 259.5V274M781 274V275M781 274H769H874M882 274H887.5H888M802 285H821M821 285H842M821 285V291M843 285H842M842 285V308M842 308V321M842 308H821M821 308H803M821 308V302M802 308H803M803 308V321" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M748 292H775.5M775.5 292H776.5M775.5 292V312V284" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M144 577V553H162M169 553H186.5V598" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M619.5 199.5L623.5 203.5L624 204L624.5 204.5L621 204" stroke="#C7CAD2" stroke-width="4"/>
                            <path d="M608 161.5L621 174.5V191.5L613.5 198" stroke="#C7CAD2" stroke-width="4"/>
                            <path d="M608 161.5L621 174.5V191.5L613.5 198" stroke="#C7CAD2" stroke-width="4"/>
                            <path d="M609 162.5L569.5 162V123L662.5 30H706L800 123V162H762.5L748.5 174" stroke="#C7CAD2" stroke-width="4"/>
                            <path d="M742 311V332H777M777 332H778M777 332V327M777 327V326M777 327H837M837 327H838M837 327V333M837 333V334M837 333H877M881 333H889M889 333H890M889 333V342" stroke="#335E8A" stroke-width="2"/>
                            <path d="M333 195V200.5M469.5 199.5V195" stroke="#335E8A" stroke-width="2"/>
                            <path d="M904 203H1046" stroke="#335E8A" stroke-width="2"/>
                            <path d="M904 238H915.915M923.859 238H972.514M994.359 238H1045V212.638" stroke="#335E8A" stroke-width="2"/>
                            <path d="M300 362H323V459M327 459V353M323 353V356H300" stroke="#335E8A" stroke-width="2"/>
                            <path d="M556 694V742H322V790H305.5C303.02 784.916 296.984 784.404 294 790H102.5C99.2279 784.77 93.7508 784.737 90.5 790H75V622H90V610" stroke="#335E8A" stroke-width="2"/>
                            <path d="M664 742H560" stroke="#335E8A" stroke-width="2"/>
                            <path d="M808 742H703" stroke="#335E8A" stroke-width="2"/>
                            <path d="M671 742H663.5V758.5H560V746.5H326V795H69V332H112V107H327V195H613L618 191V175.5L607 164H567V122L661.5 27H707L802.5 122V164L762.5 165L751.5 175.043V190.543L755 195H1039V103H1254V338H1304V794L1042 794.743V746H807V760H702V742H696" stroke="#335E8A" stroke-width="2"/>
                            <path d="M561.011 743L561 694" stroke="#335E8A" stroke-width="2"/>
                            <path d="M90 611H120V625H130.5H293M300 625H408" stroke="#335E8A" stroke-width="2"/>
                            <path d="M415.5 625H556V672M561 672V625H579M579 625V649H590.5M579 625H649.5M649.5 625V649H637M649.5 625H657M596 649H632.5M662 625H671" stroke="#335E8A" stroke-width="2"/>
                            <path d="M698 624H707M712 624H744V619H725V488H729M734 488H825V546H865V596H808V602H785V620H766V624H790M790 624V606.5H808V671.5M790 624V650H778.5H778M813 671.5L812.888 623.768L951 623.5M963.5 623.242H1103V543.5H1148V368H1154M1161 368H1304.89M773 650H736M731 650H719V641.5M719 631.5V624.5" stroke="#335E8A" stroke-width="2"/>
                            <path d="M698 620H707M712 620H719V484H729M734 484H742V437M742 432V360H777V364H837V358H877M131 606H75.5M75.5 606H70M75.5 606V362H135M143 362H170M178 362H292M882 358H889V349" stroke="#335E8A" stroke-width="2"/>
                            <path d="M135 356H117V321H141M154 321H256M275 321H323V339" stroke="#335E8A" stroke-width="2"/>
                            <path d="M140 606.5H177V600H293M300 600H323V480M328 480V485H343V481H425V492" stroke="#335E8A" stroke-width="2"/>
                            <path d="M904 194.5V280V342M904 349V367H980M991 367H1067V356H1154M1161 356H1250V107M1250 107V106M1250 107H1045V203.5M812 694V742M812 742V743M812 742H1048V789H1300M1300 789H1301M1300 789V369" stroke="#335E8A" stroke-width="2"/>
                            <path d="M991 376H1090V510H1081V534H1060V490.5H893V444M893 421.5V376H980M882 363H889V421.5M877 363H841V416.5H747V432M747 437V484H889V444" stroke="#335E8A" stroke-width="2"/>
                            <path d="M141 316.5H117V112H323V316M323 316V317M323 316H275M256 316H154" stroke="#335E8A" stroke-width="2"/>
                            <path d="M141 316.5H117V112H323V316M323 316V317M323 316H275M256 316H154" stroke="#335E8A" stroke-width="2"/>
                            <path d="M292 356H178M170 356H143" stroke="#335E8A" stroke-width="2"/>
                            <path d="M327 339V243M327 243V242.755V200H436V244M327 243H418" stroke="#335E8A" stroke-width="2"/>
                            <path d="M436 200H477V208H658M665 208H682M689.5 208H705M712 208H889V329H881M877 329H842V322H747V311" stroke="#335E8A" stroke-width="2"/>
                            <path d="M426.5 497.026H346V600.026H363V622.026H408M415 622.026H439V497.026H433M433 492.026H477M477 492.026H478M477 492.026V484.026H591M591 484.026H592M591 484.026V552M591 556V588.886L561 588.526M561 588.526L559.5 588.026M561 588.526V603.026H644V598.026M644 593.026V503.026M644 498.026V489.026M644 489.026V488.026M644 489.026H622M622 489.026V490.026M622 489.026V451.026V437M622 431V359.026M622 354.026V338.026M622 333.026V306.026M622 294.026V275.026H682M689 275.026H747M747 275.026L745.5 275M747 275.026V306.026" stroke="#335E8A" stroke-width="2"/>
                            <path d="M474 496V497M474 497V620M474 497H482M474 621V620M474 620H556M556 620H557M556 620V583M556 583V582M556 583H586M586 583H587M586 583V556M586 552V489M586 489V488M586 489H482M482 489H481M482 489V497M482 497V498" stroke="#335E8A" stroke-width="2"/>
                            <path d="M671 620H662M657 620H649V614M649 608V597M649 592V558M649 546V503M649 498V484M649 484V483M649 484H627M627 484H626M627 484V437M627 431V359M627 354V338M627 333V278M627 278V277M627 278H682M689 278H742M742 278H743M742 278V305" stroke="#335E8A" stroke-width="2"/>
                            <path d="M438 497H347V599H438V497Z" fill="#FF9E5A"/>
                            <path d="M555 498H475V619H555V498Z" fill="#C7CAD2"/>
                            <path d="M438 598H364V621H438V598Z" fill="#FF9E5A"/>
                            <path d="M416 620H408V622H416V620Z" fill="#FF9E5A"/>
                            <path d="M426 495H433V497H426V495Z" fill="#FF9E5A"/>
                            <path d="M585 490H483V582H585V490Z" fill="#C7CAD2"/>
                            <path d="M70 607H89V621H70V607Z" fill="#C7CAD2"/>
                            <path d="M70 607H89V621H70V607Z" fill="#C7CAD2"/>
                            <path d="M121 607H293V624H121V607Z" fill="#C7CAD2"/>
                            <path d="M121 607H293V624H121V607Z" fill="#C7CAD2"/>
                            <path d="M178 601H293V618H178V601Z" fill="#C7CAD2"/>
                            <path d="M178 601H293V618H178V601Z" fill="#C7CAD2"/>
                            <path d="M129 607H89V610H129V607Z" fill="#C7CAD2"/>
                            <path d="M74 621H70V794H74V621Z" fill="#C7CAD2"/>
                            <path d="M325 791H74V794H325V791Z" fill="#C7CAD2"/>
                            <path d="M91 791C93.9644 785.725 98.9651 785.738 102 791H101H92H91Z" fill="#C7CAD2"/>
                            <path d="M294.5 791C297.471 785.373 302.465 785.884 305 791H304H296H294.5Z" fill="#C7CAD2"/>
                            <path d="M325 743H323V791H325V743Z" fill="#C7CAD2"/>
                            <path d="M663 743H325V746H663V743Z" fill="#C7CAD2"/>
                            <path d="M663 746H561V758H663V746Z" fill="#C7CAD2"/>
                            <path d="M560 694H557V743H560V694Z" fill="#C7CAD2"/>
                            <path d="M560 624H557V672H560V624Z" fill="#C7CAD2"/>
                            <path d="M560 587H557V672H560V587Z" fill="#C7CAD2"/>
                            <path d="M648 558H645V592H648V558Z" fill="#C7CAD2"/>
                            <path d="M648 503H645V546H648V503Z" fill="#C7CAD2"/>
                            <path d="M626 437H623V488H626V437Z" fill="#C7CAD2"/>
                            <path d="M626 359H623V431H626V359Z" fill="#C7CAD2"/>
                            <path d="M626 338H623V354H626V338Z" fill="#C7CAD2"/>
                            <path d="M626 306H623V333H626V306Z" fill="#C7CAD2"/>
                            <path d="M626 276H623V294H626V276Z" fill="#C7CAD2"/>
                            <path d="M626 276H682V277H626V276Z" fill="#C7CAD2"/>
                            <path d="M689 276H746V277H689V276Z" fill="#C7CAD2"/>
                            <path d="M743 305H746V277H743V305Z" fill="#C7CAD2"/>
                            <path d="M743 331H746V311H743V331Z" fill="#C7CAD2"/>
                            <path d="M746 331H776V323H746V331Z" fill="#C7CAD2"/>
                            <path d="M776 326H841V323H776V326Z" fill="#C7CAD2"/>
                            <path d="M838 332H877V330H838V332Z" fill="#C7CAD2"/>
                            <path d="M838 330H841V326H838V330Z" fill="#C7CAD2"/>
                            <path d="M881 332H890V330H881V332Z" fill="#C7CAD2"/>
                            <path d="M648 485H645V498H648V485Z" fill="#C7CAD2"/>
                            <path d="M645 485H626V488H645V485Z" fill="#C7CAD2"/>
                            <path d="M648 597H645V603H648V597Z" fill="#C7CAD2"/>
                            <path d="M116 333H70V361H116V333Z" fill="#C7CAD2"/>
                            <path d="M116 357H135V361H116V357Z" fill="#C7CAD2"/>
                            <path d="M143.5 357H170V361H143.5V357Z" fill="#C7CAD2"/>
                            <path d="M178 357H218.111V361H178V357Z" fill="#C7CAD2"/>
                            <path d="M218.111 357H292V361H218.111V357Z" fill="#C7CAD2"/>
                            <path d="M141 317H116V320H141V317Z" fill="#C7CAD2"/>
                            <path d="M256 317H154V320H256V317Z" fill="#C7CAD2"/>
                            <path d="M324 317H275V320H324V317Z" fill="#C7CAD2"/>
                            <path d="M324 357H300V361H324V357Z" fill="#C7CAD2"/>
                            <path d="M424 482H344V496H424V482Z" fill="#C7CAD2"/>
                            <path d="M426 492H360V496H426V492Z" fill="#C7CAD2"/>
                            <path d="M433 493H481V496H469L456.5 498L445 496.75L440 496H433V493Z" fill="#C7CAD2"/>
                            <path d="M345 486H324V624H345V486Z" fill="#C7CAD2"/>
                            <path d="M362 601H300V624H362V601Z" fill="#C7CAD2"/>
                            <path d="M408 622H362V624H408V622Z" fill="#C7CAD2"/>
                            <path d="M557 622H416V624H557V622Z" fill="#C7CAD2"/>
                            <path d="M473 493H440V624H473V493Z" fill="#C7CAD2"/>
                            <path d="M648 603H557V624H648V603Z" fill="#C7CAD2"/>
                            <path d="M75 361H70V606H75V361Z" fill="#C7CAD2"/>
                            <path d="M75 361H70V606H75V361Z" fill="#C7CAD2"/>
                            <path d="M113 108H116V333H113V108Z" fill="#C7CAD2"/>
                            <path d="M324 108H326V339H324V108Z" fill="#C7CAD2"/>
                            <path d="M587 485H590V552H587V485Z" fill="#C7CAD2"/>
                            <path d="M587 485H478V488H587V485Z" fill="#C7CAD2"/>
                            <path d="M481 493H479.5H478V488H481V493Z" fill="#C7CAD2"/>
                            <path d="M587 556H590V587H587V556Z" fill="#C7CAD2"/>
                            <path d="M557 584H587V587H557V584Z" fill="#C7CAD2"/>
                            <path d="M324 353H326V459H324V353Z" fill="#C7CAD2"/>
                            <path d="M324 480H327V486H324V480Z" fill="#C7CAD2"/>
                            <path d="M116 108H326V111H116V108Z" fill="#C7CAD2"/>
                            <path d="M334 196H478V199H334V196Z" fill="#C7CAD2"/>
                            <path d="M620 204H658V207H620V205.5V204Z" fill="#C7CAD2"/>
                            <path d="M665 204H682V207H665V204Z" fill="#C7CAD2"/>
                            <path d="M689 204H705V207H689V204Z" fill="#C7CAD2"/>
                            <path d="M712 204H755V207H712V204Z" fill="#C7CAD2"/>
                            <path d="M750.199 196H903V207H744.33L750.199 196Z" fill="#C7CAD2"/>
                            <path d="M749 172.5V192" stroke="#C7CAD2" stroke-width="3"/>
                            <path d="M749 191L755 198" stroke="#C7CAD2" stroke-width="3"/>
                            <path d="M890 342H903V207H890V342Z" fill="#C7CAD2"/>
                            <path d="M1251 367H1253V104H1251V367Z" fill="#C7CAD2"/>
                            <path d="M1301 793H1303V367H1301V793Z" fill="#C7CAD2"/>
                            <path d="M1301 794H1043V790H1301V794Z" fill="#C7CAD2"/>
                            <path d="M1047 790H1043V743H1047V790Z" fill="#C7CAD2"/>
                            <path d="M806 745H1047V743H806V745Z" fill="#C7CAD2"/>
                            <path d="M808 694H811V744H808V694Z" fill="#C7CAD2"/>
                            <path d="M703 743H806V759H703V743Z" fill="#C7CAD2"/>
                            <path d="M890 375H903V349H890V375Z" fill="#C7CAD2"/>
                            <path d="M980 375H903V368H980V375Z" fill="#C7CAD2"/>
                            <path d="M1064 375H991V368H1064V375Z" fill="#C7CAD2"/>
                            <path d="M1141 375H1064V368H1141V375Z" fill="#C7CAD2"/>
                            <path d="M1147 368H1068V357H1147V368Z" fill="#C7CAD2"/>
                            <path d="M1251 367H1161V357H1251V367Z" fill="#C7CAD2"/>
                            <path d="M1303 367H1252V339H1303V367Z" fill="#C7CAD2"/>
                            <path d="M1154 367H1147V357H1154V367Z" fill="#C7CAD2"/>
                            <path d="M1147 542H1091V357H1147V542Z" fill="#C7CAD2"/>
                            <path d="M1138 537H1082V511H1138V537Z" fill="#C7CAD2"/>
                            <path d="M1102 623H866V535H1102V623Z" fill="#C7CAD2"/>
                            <path d="M743 416H840V365H743V416Z" fill="#C7CAD2"/>
                            <path d="M838 362H877V359H838V362Z" fill="#C7CAD2"/>
                            <path d="M838 365H840V362H838V365Z" fill="#C7CAD2"/>
                            <path d="M882 362H890V359H882V362Z" fill="#C7CAD2"/>
                            <path d="M743 365H776V361H743V365Z" fill="#C7CAD2"/>
                            <path d="M743 432H746V416H743V432Z" fill="#C7CAD2"/>
                            <path d="M743 487H746V437H743V487Z" fill="#C7CAD2"/>
                            <path d="M826 487H734V485H826V487Z" fill="#C7CAD2"/>
                            <path d="M724 485H720V623H724V485Z" fill="#C7CAD2"/>
                            <path d="M743 620H720V623H743V620Z" fill="#C7CAD2"/>
                            <path d="M720 621H712V623H720V621Z" fill="#C7CAD2"/>
                            <path d="M707 621H698V623H707V621Z" fill="#C7CAD2"/>
                            <path d="M657 621H647V624H657V621Z" fill="#C7CAD2"/>
                            <path d="M671 621H662V624H671V621Z" fill="#C7CAD2"/>
                            <path d="M892 545H826V485H892V545Z" fill="#C7CAD2"/>
                            <path d="M1059 552H892V491H1059V552Z" fill="#C7CAD2"/>
                            <path d="M326 196H332V199H326V196Z" fill="#C7CAD2"/>
                            <path d="M281 725.365V698.13M281 666.357V626.009M322.075 731.417V720.826M322.075 715.783V701.661M322.075 701.661V688.548M322.075 701.661H364.653M322.075 677.452V664.339M322.075 664.339V633.07M322.075 664.339H364.653M322.075 628.026V625M369.662 664.339H408.733M413.742 664.339H452.814M457.823 664.339H499.899V666.357M499.899 666.357V677.452M499.899 666.357V646.365V646.183M499.899 666.357V625V642.148M541.475 666.357H555M499.399 687.539V701.661M499.399 701.661V718.809M499.399 701.661H457.823M499.399 723.852V741M452.814 701.661H413.742M408.733 701.661H369.662" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M139 744.624H197.793M202.775 744.624H261.568M266.551 744.624H280M281 769.838V789M281 730V764.291" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M557 621H473V622H557V621Z" fill="#C7CAD2"/>
                            <path d="M481 196H620V207H481V196Z" fill="#C7CAD2"/>
                            <path d="M621 201H620V204H621V201Z" fill="#C7CAD2"/>
                            <path d="M76 745H95M100 745H120M120 745H134M120 745V710M144 605.5V583.5" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M500 667H515M541 667H555M555 699H541M515 699H500" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M120 677C121.657 677 123 675.657 123 674C123 672.343 121.657 671 120 671C118.343 671 117 672.343 117 674C117 675.657 118.343 677 120 677Z" fill="#B6B6BF"/>
                            <path d="M151 697C152.657 697 154 695.657 154 694C154 692.343 152.657 691 151 691C149.343 691 148 692.343 148 694C148 695.657 149.343 697 151 697Z" fill="#B6B6BF"/>
                            <path d="M151 716C152.657 716 154 714.657 154 713C154 711.343 152.657 710 151 710C149.343 710 148 711.343 148 713C148 714.657 149.343 716 151 716Z" fill="#B6B6BF"/>
                            <path d="M151 677C152.657 677 154 675.657 154 674C154 672.343 152.657 671 151 671C149.343 671 148 672.343 148 674C148 675.657 149.343 677 151 677Z" fill="#B6B6BF"/>
                            <path d="M151 657C152.657 657 154 655.657 154 654C154 652.343 152.657 651 151 651C149.343 651 148 652.343 148 654C148 655.657 149.343 657 151 657Z" fill="#B6B6BF"/>
                            <path d="M171 657C172.657 657 174 655.657 174 654C174 652.343 172.657 651 171 651C169.343 651 168 652.343 168 654C168 655.657 169.343 657 171 657Z" fill="#B6B6BF"/>
                            <path d="M191 657C192.657 657 194 655.657 194 654C194 652.343 192.657 651 191 651C189.343 651 188 652.343 188 654C188 655.657 189.343 657 191 657Z" fill="#B6B6BF"/>
                            <path d="M211 657C212.657 657 214 655.657 214 654C214 652.343 212.657 651 211 651C209.343 651 208 652.343 208 654C208 655.657 209.343 657 211 657Z" fill="#B6B6BF"/>
                            <path d="M201 691C204.866 691 208 687.866 208 684C208 680.134 204.866 677 201 677C197.134 677 194 680.134 194 684C194 687.866 197.134 691 201 691Z" fill="#B6B6BF"/>
                            <path d="M206 684C206 686.761 203.761 689 201 689C198.239 689 196 686.761 196 684C196 681.239 198.239 679 201 679C203.761 679 206 681.239 206 684Z" fill="#9BD9EE"/>
                            <path d="M231 657C232.657 657 234 655.657 234 654C234 652.343 232.657 651 231 651C229.343 651 228 652.343 228 654C228 655.657 229.343 657 231 657Z" fill="#B6B6BF"/>
                            <path d="M251 657C252.657 657 254 655.657 254 654C254 652.343 252.657 651 251 651C249.343 651 248 652.343 248 654C248 655.657 249.343 657 251 657Z" fill="#B6B6BF"/>
                            <path d="M1060.5 441C1061.88 441 1063 439.881 1063 438.5C1063 437.119 1061.88 436 1060.5 436C1059.12 436 1058 437.119 1058 438.5C1058 439.881 1059.12 441 1060.5 441Z" fill="#B6B6BF"/>
                            <path d="M1079.5 441C1080.88 441 1082 439.881 1082 438.5C1082 437.119 1080.88 436 1079.5 436C1078.12 436 1077 437.119 1077 438.5C1077 439.881 1078.12 441 1079.5 441Z" fill="#B6B6BF"/>
                            <path d="M1079.5 429C1080.88 429 1082 427.881 1082 426.5C1082 425.119 1080.88 424 1079.5 424C1078.12 424 1077 425.119 1077 426.5C1077 427.881 1078.12 429 1079.5 429Z" fill="#B6B6BF"/>
                            <path d="M1060.5 429C1061.88 429 1063 427.881 1063 426.5C1063 425.119 1061.88 424 1060.5 424C1059.12 424 1058 425.119 1058 426.5C1058 427.881 1059.12 429 1060.5 429Z" fill="#B6B6BF"/>
                            <path d="M916.5 429C917.881 429 919 427.881 919 426.5C919 425.119 917.881 424 916.5 424C915.119 424 914 425.119 914 426.5C914 427.881 915.119 429 916.5 429Z" fill="#B6B6BF"/>
                            <path d="M916.5 441C917.881 441 919 439.881 919 438.5C919 437.119 917.881 436 916.5 436C915.119 436 914 437.119 914 438.5C914 439.881 915.119 441 916.5 441Z" fill="#B6B6BF"/>
                            <path d="M251 677C252.657 677 254 675.657 254 674C254 672.343 252.657 671 251 671C249.343 671 248 672.343 248 674C248 675.657 249.343 677 251 677Z" fill="#B6B6BF"/>
                            <path d="M281 677C282.657 677 284 675.657 284 674C284 672.343 282.657 671 281 671C279.343 671 278 672.343 278 674C278 675.657 279.343 677 281 677Z" fill="#B6B6BF"/>
                            <path d="M579 670C580.657 670 582 668.657 582 667C582 665.343 580.657 664 579 664C577.343 664 576 665.343 576 667C576 668.657 577.343 670 579 670Z" fill="#B6B6BF"/>
                            <path d="M791 670C792.657 670 794 668.657 794 667C794 665.343 792.657 664 791 664C789.343 664 788 665.343 788 667C788 668.657 789.343 670 791 670Z" fill="#B6B6BF"/>
                            <path d="M579 681C580.657 681 582 679.657 582 678C582 676.343 580.657 675 579 675C577.343 675 576 676.343 576 678C576 679.657 577.343 681 579 681Z" fill="#B6B6BF"/>
                            <path d="M791 681C792.657 681 794 679.657 794 678C794 676.343 792.657 675 791 675C789.343 675 788 676.343 788 678C788 679.657 789.343 681 791 681Z" fill="#B6B6BF"/>
                            <path d="M579 691C580.657 691 582 689.657 582 688C582 686.343 580.657 685 579 685C577.343 685 576 686.343 576 688C576 689.657 577.343 691 579 691Z" fill="#B6B6BF"/>
                            <path d="M791 691C792.657 691 794 689.657 794 688C794 686.343 792.657 685 791 685C789.343 685 788 686.343 788 688C788 689.657 789.343 691 791 691Z" fill="#B6B6BF"/>
                            <path d="M669 652C670.657 652 672 650.657 672 649C672 647.343 670.657 646 669 646C667.343 646 666 647.343 666 649C666 650.657 667.343 652 669 652Z" fill="#B6B6BF"/>
                            <path d="M669 720C670.657 720 672 718.657 672 717C672 715.343 670.657 714 669 714C667.343 714 666 715.343 666 717C666 718.657 667.343 720 669 720Z" fill="#B6B6BF"/>
                            <path d="M679 745C680.657 745 682 743.657 682 742C682 740.343 680.657 739 679 739C677.343 739 676 740.343 676 742C676 743.657 677.343 745 679 745Z" fill="#B6B6BF"/>
                            <path d="M645 755C646.657 755 648 753.657 648 752C648 750.343 646.657 749 645 749C643.343 749 642 750.343 642 752C642 753.657 643.343 755 645 755Z" fill="#B6B6BF"/>
                            <path d="M787 755C788.657 755 790 753.657 790 752C790 750.343 788.657 749 787 749C785.343 749 784 750.343 784 752C784 753.657 785.343 755 787 755Z" fill="#B6B6BF"/>
                            <path d="M574 755C575.657 755 577 753.657 577 752C577 750.343 575.657 749 574 749C572.343 749 571 750.343 571 752C571 753.657 572.343 755 574 755Z" fill="#B6B6BF"/>
                            <path d="M716 755C717.657 755 719 753.657 719 752C719 750.343 717.657 749 716 749C714.343 749 713 750.343 713 752C713 753.657 714.343 755 716 755Z" fill="#B6B6BF"/>
                            <path d="M679 652C680.657 652 682 650.657 682 649C682 647.343 680.657 646 679 646C677.343 646 676 647.343 676 649C676 650.657 677.343 652 679 652Z" fill="#B6B6BF"/>
                            <path d="M679 720C680.657 720 682 718.657 682 717C682 715.343 680.657 714 679 714C677.343 714 676 715.343 676 717C676 718.657 677.343 720 679 720Z" fill="#B6B6BF"/>
                            <path d="M689 745C690.657 745 692 743.657 692 742C692 740.343 690.657 739 689 739C687.343 739 686 740.343 686 742C686 743.657 687.343 745 689 745Z" fill="#B6B6BF"/>
                            <path d="M655 755C656.657 755 658 753.657 658 752C658 750.343 656.657 749 655 749C653.343 749 652 750.343 652 752C652 753.657 653.343 755 655 755Z" fill="#B6B6BF"/>
                            <path d="M797 755C798.657 755 800 753.657 800 752C800 750.343 798.657 749 797 749C795.343 749 794 750.343 794 752C794 753.657 795.343 755 797 755Z" fill="#B6B6BF"/>
                            <path d="M584 755C585.657 755 587 753.657 587 752C587 750.343 585.657 749 584 749C582.343 749 581 750.343 581 752C581 753.657 582.343 755 584 755Z" fill="#B6B6BF"/>
                            <path d="M726 755C727.657 755 729 753.657 729 752C729 750.343 727.657 749 726 749C724.343 749 723 750.343 723 752C723 753.657 724.343 755 726 755Z" fill="#B6B6BF"/>
                            <path d="M690 652C691.657 652 693 650.657 693 649C693 647.343 691.657 646 690 646C688.343 646 687 647.343 687 649C687 650.657 688.343 652 690 652Z" fill="#B6B6BF"/>
                            <path d="M689 720C690.657 720 692 718.657 692 717C692 715.343 690.657 714 689 714C687.343 714 686 715.343 686 717C686 718.657 687.343 720 689 720Z" fill="#B6B6BF"/>
                            <path d="M700 652C701.657 652 703 650.657 703 649C703 647.343 701.657 646 700 646C698.343 646 697 647.343 697 649C697 650.657 698.343 652 700 652Z" fill="#B6B6BF"/>
                            <path d="M699 720C700.657 720 702 718.657 702 717C702 715.343 700.657 714 699 714C697.343 714 696 715.343 696 717C696 718.657 697.343 720 699 720Z" fill="#B6B6BF"/>
                            <path d="M579 702C580.657 702 582 700.657 582 699C582 697.343 580.657 696 579 696C577.343 696 576 697.343 576 699C576 700.657 577.343 702 579 702Z" fill="#B6B6BF"/>
                            <path d="M791 702C792.657 702 794 700.657 794 699C794 697.343 792.657 696 791 696C789.343 696 788 697.343 788 699C788 700.657 789.343 702 791 702Z" fill="#B6B6BF"/>
                            <path d="M281 696C282.657 696 284 694.657 284 693C284 691.343 282.657 690 281 690C279.343 690 278 691.343 278 693C278 694.657 279.343 696 281 696Z" fill="#B6B6BF"/>
                            <path d="M251 697C252.657 697 254 695.657 254 694C254 692.343 252.657 691 251 691C249.343 691 248 692.343 248 694C248 695.657 249.343 697 251 697Z" fill="#B6B6BF"/>
                            <path d="M251 717C252.657 717 254 715.657 254 714C254 712.343 252.657 711 251 711C249.343 711 248 712.343 248 714C248 715.657 249.343 717 251 717Z" fill="#B6B6BF"/>
                            <path d="M120 698C121.657 698 123 696.657 123 695C123 693.343 121.657 692 120 692C118.343 692 117 693.343 117 695C117 696.657 118.343 698 120 698Z" fill="#B6B6BF"/>
                            <path d="M849 483V474M849 474V467M849 474H872M872 474H873M872 474V467M872 456V451H865H888M861 451H849M849 451H830M849 451V456M825 451H807M807 451H796M807 451V462M807 462V465M807 462H820.5M820.5 462H822M820.5 462C820.1 462 820 455.333 820 452L820.339 473M820.339 473L820.5 483M820.339 473H822H807V470V483M780.5 483V459M780.5 455V451M780.5 451V443M780.5 451H791M780.5 432V425" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M589.5 255V209M625 209V255M625 260.5V273M624 241H682M688 241H728.5M728.5 241V227.5H737V241M728.5 241H737M746 241H745M745 241V250M745 241H737M745 250V272M745 250H768" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M633 240V230M635 228H640M642 230V240M730 214.5H736M793.5 208V231M793.5 235V240M793.5 240V241M793.5 240H826M826 240H835M826 240V208M844 240H875M884 240H888M837 357V348M837 343V334M807.5 334V328M807.5 358V363" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M633 240V230M635 228H640M642 230V240M730 214.5H736M793.5 208V231M793.5 235V240M793.5 240V241M793.5 240H826M826 240H835M826 240V208M844 240H875M884 240H888M837 357V348M837 343V334M807.5 334V328M807.5 358V363" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M748.5 292H775.5V284.5V312M803 321V308M803 308V307M803 308H821M821 308H828M821 308V302M843 308H842M842 308V321V285M842 308H828M842 285V284M842 285H821M828 308V321M821 285H802M821 285V291" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M477.5 209V240.5V274M477.5 274V307V331M477.5 274H520M477.5 331V332M477.5 331H520M525 331H536.5M536.5 331H537M536.5 331V274M536.5 274V273.342M536.5 274H525" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M537 274H608M608 274H613M608 274V325H591M591 325H549V331M591 325V331M549 332V331M549 331H591M591 331H592M554 332V344M537 331H542M542 331H543M542 331V325M542 325V324M542 325H537.5" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M477 482V417.5M477 417.5V415M477 417.5H483M485 417.5H520M477 406V361.5M477 361.5V352M477 361.5H520M525 361.5H591.5M591.5 361.5H592M591.5 361.5V367.5M591.5 367.5V368M591.5 367.5H584M584 367.5H583M584 367.5V417.5M584 417.5V418M584 417.5H591V432M584 417.5H528M591 437V465M591 470V482M551.5 483V470M551.5 465V418" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M144 600H175.5M187 532V531M187 531V407M187 531H144M187 406V407M187 407H144M144 407H143M144 407V531M144 531V532" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M144.5 396V363M251.5 363V396M251.5 406V523M251.5 530V555M251.5 562V582M251.5 582V598V599M251.5 582H283M187 396V363M328 451.5H353M357 451.5H363M374 451.5H368M379 451.5H396M401 451.5H416.5H417M416.5 351V367.5M416.5 367.5V368M416.5 367.5H401M396 367.5H381M381 367.5H380M381 367.5V351M381 342V325M381 325V324M381 325H397M401 325H417M417 325H418M417 325V342M329 330H340M340 330V321M340 330H351.5V321H329H340M340 321V320" stroke="#C7CAD2" stroke-width="2"/>
                            <path d="M435 201H328V243H435V201Z" fill="#5194C8"/>
                            <path d="M962 404.895V377M1014.5 404.895V392.94M1014.5 388.955V377M1060.5 377V387.959M1060.5 392.94V404.895M1014.5 459.689V472.142M1014.5 477.124V488.581M1080 510.5H1072.5V500.5H1081" stroke="#C7CAD2"/>
                            <path d="M912 566L933 495H957.5H981.731L912 610V566Z" fill="#FF9E5A"/>
                            <path d="M912 601.5L982 495L1003 565.5V611C985.971 616.581 972.442 618.031 954 617L912 601.5Z" fill="#FF9E5A"/>
                            <path d="M912.536 599L951.005 602.806L957 617.487C938.448 619.856 912.239 613.387 912.037 610.962C911.834 608.538 912.536 599 912.536 599Z" fill="#FF9E5A"/>
                            <path d="M951 616H964V619H951V616Z" fill="#FF9E5A"/>
                            <path d="M951 618C934.5 618 925.225 616.124 911 611.5V565.5L932.5 494H982.5L1004 565.5V611.5C990.992 616.162 982 618 964 618" stroke="#335E8A" stroke-width="2"/>
                            <path d="M578.5 660V650M578 649.5H562M579 706.5V716.5M579 716.5V740.5M579 716.5H562H591M595.5 716.5H633M637 716.5H649M649 716.5H661M649 716.5V715V741M708 716.5H719.5M719.5 716.5H731M719.5 716.5V715V741M736 716.5H773M778 716.5H790.5M790.5 716.5H791M790.5 716.5V706.5V741M790.5 659V651" stroke="#C7CAD2"/>
                            <path d="M824 489H726V595H824V489Z" fill="#98BDE5"/>
                            <path d="M864 547H824V595H864V547Z" fill="#98BDE5"/>
                            <path d="M784 594H726V619H784V594Z" fill="#98BDE5"/>
                            <path d="M807 595H784V601H807V595Z" fill="#98BDE5"/>
                            <path d="M765 619H745V625H765V619Z" fill="#98BDE5"/>
                            <path d="M789 625H720V649H789V625Z" fill="#98BDE5"/>
                            <path d="M185 196H162.5M162.5 196H146M162.5 196V179M141 196H119M125 237.5H180M220.5 300V315" stroke="#C9C8D0"/>
                            <path d="M660.5 649.5H650.5M707 649.5H718" stroke="#C7CAD2"/>
                            <path d="M807 741V694" stroke="#335E8A" stroke-width="2"/>
                            <path d="M120 658V626" stroke="#C9C8D0" stroke-width="2"/>
                            <path d="M119 337H140.5V322M155.5 322V337H243M243 337H255V322.5M243 337V322" stroke="#C9C8D0" stroke-width="2"/>
                            <path d="M232 337V322M276.5 322V337H281M284 337H312M318 337H322M306 315V196M306 196V195M306 196H322M306 196H299" stroke="#C9C8D0" stroke-width="2"/>
                            <path d="M186 315V312M186 304.5V288M186 283.5V278.5M186 278.5V196M186 278.5H255M186 195V196M186 196H255M255 196H256M255 196V278.5M255 278.5V279.5V304.5" stroke="#C9C8D0" stroke-width="2"/>
                            <path d="M141 156.5H137V113M146 156.5H292M304.5 158V113M310 156.5H318" stroke="#C9C8D0"/>
                            <path d="M257.5 155V137M257.5 131V113M210.5 113V131M210.5 137V155M186.5 141V127M162.5 113V131M162.5 138V155V157" stroke="#C9C8D0"/>
                            <path d="M256 279H299" stroke="#C9C8D0"/>
                            <path d="M329 302H352V244" stroke="#C9C8D0"/>
                            <path d="M536.5 332V347.5M536.5 362V388H529V417M520 388H504.5M504.5 388H477M504.5 388V392.5" stroke="#C9C8D0" stroke-width="2"/>
                            <path d="M724 84L721 87M730 78L740 68M745 94L737 102L736.5 102.5M752 87L755.5 83.5L756 83M777 104L769 111M765 115L757.5 122.5L757 123" stroke="#C9C8D0"/>
                            <path d="M617 120L604 107M601 104L597.5 101M601 158.5V151.5M601 146V127.5H589M585 127.5H573.5" stroke="#C9C8D0"/>
                            <path d="M609.5 136V127.5L616.5 120.5L636 101M636 101L653.5 83.5M636 101L627.5 93M670.5 66.5H680M670.5 66.5L667 63M670.5 66.5L653.5 83.5M653.5 83.5L653 83L648 78M690.5 67H701.5M701.5 67L761 127V133H772M701.5 67L705 63M778.5 133H796.5M707 61L719.5 47M651 48L663.5 60M634 64L642 72M623.5 89L616.5 82" stroke="#C9C8D0"/>
                            <path d="M712 203H745.306L751 196.5L746.5 192V173L762 159.5H797V123.5L705.5 32H663.5L572 124.4V160H610L624 174V192.5L619.5 197L625 203H658M705 203H689M682 203H665" stroke="#335E8A" stroke-width="2"/>
                            <path d="M638.5 135V134.5M638.5 134.5V154V154.5L641.5 157M638.5 134.5L641.5 131.5M673 101L677 97.5H682M689 97.5H695L698 101M730 131L734 134.5V150.5L728.5 156.5M697.5 187L694 190.5H689.5M680 190.5H676.5L673 187M680 179.5H690M691 109.5H688M683 109.5H680" stroke="#C9C8D0"/>
                            <path d="M584.5 273.5V302.5M584.5 302.5V324.5M584.5 302.5H599M608 273.5V298.5M608 305.5V324.5H591.5M591.5 324.5H549V331.5H591.5V324.5Z" stroke="#C9C8D0"/>
                            <path d="M584 275H537V324H584V275Z" fill="#CEE2EB"/>
                            <path d="M868.5 625V636.917M868.5 639V655M868.5 655V666M868.5 655H908M868.5 666V667M868.5 666H875M908 655H909M908 655V649M908 649V648M908 649H920M925 649H926M926 649H949M926 649V709V710H955H895M895 710H890M895 710V690M885 710H868.5V690M969 648H989M989 648H1006M989 648L988.5 710H1047M1007 648H1006M1006 648V655M1006 655V656M1006 655H1047M1048 675V690" stroke="#C9C8D0" stroke-width="2"/>
                            <path d="M988.5 710H967.5" stroke="#C9C8D0" stroke-width="2"/>
                            <path d="M1049 741H1066.5M1072 741H1103M1107 741H1132M1137 741H1172M1177 741H1196M1201 741H1222M1227 741H1252M1252 741H1274M1252 741V732M1279 741H1299M1252 727V638M1252 633V624M1252 624V617.5M1252 624H1228V608.5H1299M1252 616V617.5M1252 617.5L1298.5 617" stroke="#C9C8D0" stroke-width="2"/>
                            <path d="M1091 625V655.5H1099M1104.5 655.5H1124.5V625M1124.5 625V697.5M1124.5 625H1116.75M1124.5 625H1141.5M1124.5 697.5V710.5M1124.5 697.5H1252M1116.75 625H1109M1116.75 625V609H1139H1218.5V624H1193H1167.5" stroke="#C9C8D0" stroke-width="2"/>
                            <path d="M1148 545.5V609M1170 550V549M1170 549V475H1182V476V491H1173V546H1277V491H1270M1170 549H1280M1270 491V476M1270 491V492M1280 549H1281M1280 549V476M1280 476V475M1280 476H1270M1270 476H1269" stroke="#C9C8D0" stroke-width="2"/>
                            <path d="M1169 491H1163V587H1288V491H1280M1255 491V476H1196V491H1255Z" stroke="#C9C8D0" stroke-width="2"/>
                            <path d="M1287 550H1164V586H1287V550Z" fill="#A6D4E5"/>
                            <path d="M1287 550H1281V492H1287V550Z" fill="#A6D4E5"/>
                            <path d="M1169 550H1164V492H1169V550Z" fill="#A6D4E5"/>
                            <path d="M1045.5 130H1065V108M1090.5 108V131M1115.5 120V108M1157 108V130H1168V108M1192.5 108V133H1199V108M1231 108V130H1223V142H1248.5H1217.5M1217.5 142H1213.5M1217.5 142V165.5H1213.5M1203.5 143V165.5M1173.5 165.5V143M1213.5 198.5H1215H1184.5V275H1215M1220 275H1249M1249 327H1227V316.5M1227 316.5V293M1227 316.5H1208.5M1208.5 316.5H1190M1208.5 316.5V345.5H1190V355M1190 316.5V339M1190 316.5V293M1168 142H1127M1120.5 142H1100V213M1100 224V231M1100 231H1165V272.5M1100 231H1078.5V238H1139V281H1143.5V272.5H1165M1165 272.5V273.5" stroke="#C9C8D0" stroke-width="2"/>
                            <path d="M1082.5 238V266.5H1094M1099 266.5H1110.5V283.5M1110.5 288V305H1100M1094 305H1082.5M1082.5 305H1078M1082.5 305V313M1082.5 326.5V335H1078H1138.5V290.5H1143.5V298.5H1165V317.5M1165 317.5V333M1165 317.5H1143V324.5M1143 324.5V339M1143 324.5H1155V339H1138.5H1170.5" stroke="#C9C8D0" stroke-width="2"/>
                            <path d="M1208 317H1191V345H1208V317Z" fill="#CEE2EB"/>
                            <path d="M1019.5 239L1019 335H1043H1067.5M1067.5 335H1070M1067.5 335V326M1067.5 313V307V224.5" stroke="#C9C8D0" stroke-width="2"/>
                            <path d="M1087 710.286H1048V689.714H1084M1087 710.286H1090V689.714H1087M1087 710.286V712V689.714M1084 689.714H1087M1084 689.714V688V712M1087 689.714V688M1081 712V688M1078 688V712M1075 712V688M1072 688V712M1069 712V688M1066 688V712M1063 712V688M1060 688V712M1057 712V688M1054 688C1054 688 1054 703.431 1054 712M1051 712V688" stroke="#305B88" stroke-width="2"/>
                            <path d="M718.011 150.969L689.799 179.182L699.382 188.765L725.425 162.723M718.011 150.969L720.182 148.799L729.765 158.382L727.595 160.552M718.011 150.969L717.213 150.17L727.595 160.552M725.425 162.723L727.595 160.552M725.425 162.723L726.223 163.521L715.043 152.34M727.595 160.552L728.394 161.351M712.872 154.511L724.053 165.691M721.883 167.862L710.702 156.681M708.532 158.851L719.713 170.032M717.543 172.202L706.362 161.021M704.192 163.192L715.372 174.372M713.202 176.543L702.021 165.362M699.851 167.532L711.032 178.713M708.862 180.883L697.681 169.702M695.511 171.872L706.691 183.053M704.521 185.223C704.521 185.223 697.333 178.035 693.34 174.043M691.17 176.213L702.351 187.394" stroke="#305B88"/>
                            <path d="M1045 204H905V237H1045V204Z" fill="#5D9BCB"/>
                            <path d="M729 485H724V487H729V485Z" fill="#C7CAD2"/>
                            </g>

                            {/* paths */}
                            <path className='1-2' d="M393 683.5H296.5V560H224V536.5" stroke="#999999" strokeWidth={3}/>
                            <path className='12-3' d="M296.5 469V345.5H266.5V226.5H225" stroke="#999999" strokeWidth={3}/>
                            <path className='0-1' d="M406 683.5H677.5" stroke="#999999" strokeWidth={3}/>
                            <path className='0-6' d="M686 635.5H709.5V434.5" stroke="#999999" strokeWidth={3}/>
                            <path className="6-10" d="M709.5 434.5H801.5" stroke="#999999" strokeWidth={3}/>
                            <path className='12-4' d="M400 346H355.5V468.5H296.5" stroke="#999999" strokeWidth={3}/>
                            <path className='2-3' d="M223.5 527L223 402.5H139.5V345.5H148.5V226.5H214" stroke="#999999" strokeWidth={3}/>
                            <path className='6-11' d="M686.5 300V435H700.5" stroke="#999999" strokeWidth={3}/>
                            <path className='4-11' d="M407.5 346.5H610.5V335.5H686" stroke="#999999" strokeWidth={3}/>
                            <path className='8-9' d="M986.5 421V340.5" stroke="#999999" strokeWidth={3}/>
                            <path className='10-9' d="M979 432L824 432" stroke="#999999" strokeWidth={3}/>
                            <path className='11-5' d="M686.5 336L686.5 139.928" stroke="#999999" strokeWidth={3}/>
                            <path className='0-7' d="M690 683H843.808V728H1190V664" stroke="#999999" strokeWidth={3}/>
                            <path className='7-8' d="M990.5 341.5V345.5H1157.5V599.5H1224V661H1199" stroke="#999999" strokeWidth={3}/>
                            <path className='2-12' d="M296.5 469V528.104L230.5 528" stroke="#999999" strokeWidth={3}/>
                            <path className='0-6' d="M685.5 635V672" stroke="#999999" strokeWidth={3}/>

                            {/* nodes */}
                            <circle onDoubleClick={selectNodes} id = '0' cx="685.5" cy="683.5" r="12.5" fill="#00B2FF"/>
                            <circle onDoubleClick={selectNodes} id = '1' cx="399.5" cy="683.5" r="12.5" fill="#00B2FF"/>
                            <circle onDoubleClick={selectNodes} id = '2' cx="224.5" cy="529.5" r="12.5" fill="#00B2FF"/>
                            <circle onDoubleClick={selectNodes} id = '12' cx="297" cy="469.5" r="12.5" fill="#00B2FF"/>
                            <circle onDoubleClick={selectNodes} id = '3' cx="223.5" cy="226.5" r="12.5" fill="#00B2FF"/>
                            <circle onDoubleClick={selectNodes} id = '4' cx="399.5" cy="344.5" r="12.5" fill="#00B2FF"/>
                            <circle onDoubleClick={selectNodes} id = '5' cx="685.5" cy="140.5" r="12.5" fill="#00B2FF"/>
                            <circle onDoubleClick={selectNodes} id = '6' cx="710.5" cy="430.5" r="12.5" fill = "#00B2FF"/>
                            <circle onDoubleClick={selectNodes} id = '11' cx="686.5" cy="335.5" r="12.5" fill = "#00B2FF"/>
                            <circle onDoubleClick={selectNodes} id = '7' cx="1190.5" cy="658.5" r="12.5" fill="#00B2FF"/>
                            <circle onDoubleClick={selectNodes} id = '8' cx="986.5" cy="331.5" r="12.5" fill="#00B2FF"/>
                            <circle onDoubleClick={selectNodes} id = '9' cx="986.5" cy="430.5" r="12.5" fill="#00B2FF"/>
                            <circle onDoubleClick={selectNodes} id = '10' cx="813.5" cy="430.5" r="12.5" fill = "#00B2FF"/>
                            <defs>
                            <clipPath id="clip0_18_5">
                            <rect width="1348" height="836" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                        </TransformComponent>
                    </TransformWrapper>

                        < MdOutlineDirectionsWalk size = {19} color="white" className = 'direction-path-icon'/>
                        <button className = 'getPath' onClick = {() => getPath()}>Get Directions</button>

                        <BiReset className="reset-path-icon" size = {19} color = 'white'/>
                        <button className = 'clearPath' onClick = {clearSourceAndDestination}>Reset Direction</button>
                </div>
            </div>
    )
}


