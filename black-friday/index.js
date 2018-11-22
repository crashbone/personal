var app = new Vue({
    el: '#maindiv',
    data: {
        test: "asd",
        items:[
            // [
            //     (0)"IMGPATH",
            //     (1)"TITLE",
            //     (2)"PRICE"
            //     (3)"http://link"
            // ]
            [
                "./img/kulaklik/pio-beyaz.jpg",
                "[TR]Pioneer Cuffia Se-Mj503T-W Kulaklık, Beyaz",
                "48,20 TL",
                "https://www.amazon.com.tr/Pioneer-Cuffia-Se-Mj503T-W-Kulaklık-Beyaz/dp/B015RLEAH0"
            ],
            [
                "./img/kulaklik/pio-siyah.jpg",
                "[TR]Pioneer Se-Mj503-T-K Kulaklık, Siyah",
                "57,20 TL",
                "https://www.amazon.com.tr/Pioneer-SE-MJ503T-K-Se-Mj503-T-K-Kulaklık-Siyah/dp/B015RLE9HQ"
            ],
			[
                "./img/ssd/samsung.jpg",
                "[COM]Samsung 860 EVO 500GB",
                "$72.99 + $20.33",
                "https://www.amazon.com/Samsung-500GB-Internal-MZ-76E500B-AM/dp/B0781Z7Y3S"
            ],
			[
                "./img/ssd/samsung.jpg",
                "[COM]Samsung 860 EVO 1TB",
                "$127.98 + $31.14",
                "https://www.amazon.com/Samsung-Inch-Internal-MZ-76E1T0B-AM/dp/B078DPCY3T"
            ],
			[
                "./img/controller/ps4.jpg",
                "[COM]Sony PS4 Dualshock 4 Wireless Controller",
                "$38.99 + $16.12",
                "https://www.amazon.com/DualShock-Wireless-Controller-PlayStation-Black-4/dp/B01LWVX2RG"
            ],
			
        ]
    }
})