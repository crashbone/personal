var app = new Vue({
    el: '#maindiv',
    data: {
        test: "asd",
        items: [
            // [
            //     (0)"IMGPATH",
            //     (1)"TITLE",
            //     (2)"PRICE"
            //     (3)"http://link"
            // ]
			[
                "./img/oyun/hitman.png",
                '[Steam]Hitman™',
                "30,98 TL",
                "https://store.steampowered.com/app/236870/HITMAN"
            ],
            [
                "./img/ekran-karti/msi-vega56.jpg",
                '[HB]MSI AMD Vega56 Air Boost 8GB',
                "1.999,62 TL",
                "https://www.hepsiburada.com/msi-vga-radeon-rx-vega-56-air-boost-8gb-oc-ekran-karti-p-HBV00000A0VAM"
            ],
            [
                "./img/fare/g600.jpg",
                '[COM]Logitech G600 MMO Mouse',
                "$37.14 + $14.69",
                "https://www.amazon.com/Logitech-Backlit-Programmable-Buttons-910-002864/dp/B0086UK7IQ"
            ],
			[
                "./img/ekran-karti/msi1050ti.jpg",
                '[TR]MSI 1050 TI 4GB AERO',
                "940,64 TL",
                "https://www.amazon.com.tr/dp/B073WGWCDC"
            ],
            [
                "./img/kulaklik/jbl-t450.jpg",
                '[HB]JBL T450 Kulaküstü Kulaklık CT OE',
                "99,90 TL",
                "https://www.hepsiburada.com/jbl-t450-kulakustu-kulaklik-ct-oe-pm-HB000004FXQO"
            ],
            [
                "./img/fare/deathadder6400.jpg",
                '[HB]Razer Deathadder 6400DPI',
                "199,00 TL",
                "https://www.hepsiburada.com/razer-deathadder-expert-mouse-p-BD800351"
            ],
            [
                "./img/fare/deathadder1800.jpg",
                '[GB]Razer Deathadder RZ01-0085 1800DPI',
                "131.11 TL",
                "https://tr.gearbest.com/mouse/pp_1422191.html"
            ],
            [
                "./img/monitor/vx2458.jpg",
                '[HB]ViewSonic VX2458-C 24" 144Hz 1ms Freesync 1080p',
                "999,00 TL",
                "https://www.hepsiburada.com/viewsonic-vx2458-c-mhd-24-144hz-1ms-hdmi-display-dvi-freesync-full-hd-curved-monitor-p-HBV00000F4VYS"
            ],
            [
                "./img/ekran-karti/asus1070ti.jpg",
                "[HB]Asus Turbo 1070 TI 8GB",
                "2.319,15 TL",
                "https://www.hepsiburada.com/asus-turbo-nvidia-geforce-gtx-1070ti-8gb-256bit-gddr5-dx12-pci-e-3-0-ekran-karti-turbo-gtx1070ti-8g-p-HBV000009813B?"
            ],
            [
                "./img/controller/ps4.jpg",
                "[COM]Sony PS4 Dualshock 4 Wireless Controller",
                "$38.99 + $16.12",
                "https://www.amazon.com/DualShock-Wireless-Controller-PlayStation-Black-4/dp/B01LWVX2RG"
            ],
            [
                "./img/ssd/samsung.jpg",
                "[COM]Samsung 860 EVO 1TB",
                "$127.98 + $31.14",
                "https://www.amazon.com/Samsung-Inch-Internal-MZ-76E1T0B-AM/dp/B078DPCY3T"
            ],
            [
                "./img/ssd/samsung.jpg",
                "[COM]Samsung 860 EVO 500GB",
                "$72.99 + $20.33",
                "https://www.amazon.com/Samsung-500GB-Internal-MZ-76E500B-AM/dp/B0781Z7Y3S"
            ],
            [
                "./img/kulaklik/pio-siyah.jpg",
                "[TR]Pioneer Se-Mj503-T-K Kulaklık, Siyah",
                "57,20 TL",
                "https://www.amazon.com.tr/Pioneer-SE-MJ503T-K-Se-Mj503-T-K-Kulaklık-Siyah/dp/B015RLE9HQ"
            ],
            [
                "./img/kulaklik/pio-beyaz.jpg",
                "[TR]Pioneer Cuffia Se-Mj503T-W Kulaklık, Beyaz",
                "48,20 TL",
                "https://www.amazon.com.tr/Pioneer-Cuffia-Se-Mj503T-W-Kulaklık-Beyaz/dp/B015RLEAH0"
            ],
        ]
    }
})