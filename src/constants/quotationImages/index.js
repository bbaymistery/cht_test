import SaloonImage from '../../../public/images/quotationCard/saloon.png';
import Mpv from '../../../public/images/quotationCard/mpv.png';
import Seater8 from '../../../public/images/quotationCard/MPV-VIP.png';
import ExecutiveSaloon from '../../../public/images/quotationCard/saloonvip.png';
import ExecutiveMPV from '../../../public/images/quotationCard/8seat.png';
import Executive8Seater from '../../../public/images/quotationCard/8seat.png';
//Executive MPV  =Executive 8 seater


//burdaki image icerisindekiler asagidakilara istinaden hazirlanib.
//eskiden hepsi appdata icerisindeki carTypes icinden alinirdi
//sonra update olundu Cartypes icerisi yerine bu sekilde aliriq
/*
${env.apiDomain}/media/normal-saloon-v2.png
${env.apiDomain}/media/normal-mpv-v2.png
${env.apiDomain}/media/normal-8-seaters-v2.png
${env.apiDomain}/media/vip-saloon-v2.png
${env.apiDomain}/media/vip-mpv-v2.png
${env.apiDomain}/media/vip-8-seaters-v2.png
*/
export const quotationImagesObj = {
    1: {
        name: "Saloon",
        image: "/media/normal-saloon-v2.png",
        id: 1,
    },
    2: {
        name: "MPV",
        image: "/media/normal-mpv-v2.png",
        id: 2,
    },
    3: {
        name: "8 Seater",
        image: "/media/normal-8-seaters-v2.png",
        id: 3,
    },
    4: {
        name: "Executive Saloon",
        image: "/media/vip-saloon-v2.png",
        id: 4,
    },
    5: {
        name: "Executive MPV",
        image: "/media/vip-mpv-v2.png",
        id: 5,
    },
    6: {
        name: "Executive 8 Seater",
        image: "/media/vip-mpv-v2.png",
        id: 6,
    }
}

// export const quotationImages = [
//     {
//         name: "Saloon",
//         urlImage: SaloonImage,
//         id: 1,
//     },
//     {
//         name: "MPV",
//         urlImage: Mpv,
//         id: 2,
//     },
//     {
//         name: "8 Seater",
//         urlImage: Seater8,
//         id: 3,
//     },
//     {
//         name: "Executive Saloon",
//         urlImage: ExecutiveSaloon,
//         id: 4,
//     },
//     {
//         name: "Executive MPV",
//         urlImage: ExecutiveMPV,
//         id: 5,
//     },
//     {
//         name: "Executive 8 Seater",
//         urlImage: Executive8Seater,
//         id: 6,
//     },
// ]