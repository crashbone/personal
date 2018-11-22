var app = new Vue({
    el: '#maindiv',
    data: {
        test: "asd",
        items:[
            // [
            //     (0)"./IMGPATH",
            //     (1)"TITLE",
            //     (2)"PRICE"
            //     (3)"http://link"
            // ]
            [
                "./1/1.jpg",
                "[TR]Pioneer Cuffia Se-Mj503T-W Kulaklık, Beyaz",
                "48,20 TL",
                "https://www.amazon.com.tr/Pioneer-Cuffia-Se-Mj503T-W-Kulaklık-Beyaz/dp/B015RLEAH0"
            ],
            [
                "./2/1.jpg",
                "[TR]Pioneer Se-Mj503-T-K Kulaklık, Siyah",
                "57,20 TL",
                "https://www.amazon.com.tr/Pioneer-SE-MJ503T-K-Se-Mj503-T-K-Kulaklık-Siyah/dp/B015RLE9HQ"
            ],
			[
                "./3/1.jpg",
                "Samsung 860 EVO 500GB",
                "$72.99 + $20.33",
                "https://www.amazon.com/Samsung-500GB-Internal-MZ-76E500B-AM/dp/B0781Z7Y3S"
            ],
			[
                "./3/1.jpg",
                "Samsung 860 EVO 1TB",
                "$127.98 + $31.14",
                "https://www.amazon.com/Samsung-Inch-Internal-MZ-76E1T0B-AM/dp/B078DPCY3T"
            ],
        ]
    }
})