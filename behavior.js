'use strict';

    let title = document.body.querySelector(".title-container"),
        nav = document.body.querySelector(".nav-container"),
        imgs = document.body.querySelectorAll("img"),
        newsletter = document.body.querySelector("#newsletter"),
        nav_btn = document.body.querySelector(".nav-btn");
        
    document.addEventListener("scroll", handleNav);
    document.addEventListener("scroll", handleImg);
    window.addEventListener("resize", handleResize);
    newsletter.addEventListener("mouseenter", handleNewsletter);
    newsletter.addEventListener("mouseleave", handleNewsletterOut);
    nav_btn.addEventListener("click", handleNavBtn);

    handleImg(imgs);
    handleResize();

    function handleNav(e) {
        if (this.oldScroll < window.scrollY) {
            nav.style.top = 0;
        } else {
            nav.style.top = 50 + "px";
        }
        this.oldScroll = window.scrollY;
    }

    function handleImg(e) {
        let visible = document.body.querySelectorAll(".visible");
        
        for (let i of visible) isVisible(i) ? setSrc(i) : null;

        function isVisible(img) {
            let coords = img.getBoundingClientRect(),
                windowHeight = document.documentElement.clientHeight,
                topVisible = coords.top > 0 && coords.top < windowHeight,
                bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

                return topVisible || bottomVisible;
        }
    }

    function handleResize(e) {
        if (window.innerWidth > 768) {
            nav.classList.remove("not-visible");
            nav_btn.classList.add("not-visible");
            newsletter.classList.remove("not-visible");
        }
        if (window.innerWidth < 768) {
            nav.classList.add("not-visible");
            nav_btn.classList.remove("not-visible");
            newsletter.classList.add("not-visible");
        }
        console.log('window.innerWidth', window.innerWidth)

    }

    function setSrc(img) {
        let src = img.dataset.src,
            image = document.createElement("img"),
            temp = document.createElement("img");

        if (!setSrc.loaded) {
            temp.setAttribute("src", "https://svgshare.com/i/SeQ.svg");
            img.replaceWith(temp);
            img.style.opacity = 0;
        } 

        image.onload = function(e) {
            temp.replaceWith(img);
            img.style.transition = "opacity 1s";
            img.setAttribute("src", src); 
            setSrc.loaded = true;
            setTimeout(() => img.style.opacity = 1);
        }
        
        image.src = src;
    }

    function handleNewsletter() {
        let tooltip = document.createElement("div");
        tooltip.setAttribute("id", "tooltip");
        tooltip.innerHTML = `
        <div class="newsletter-tooltip-container">
            <div class="" id="newsletter-tooltip-title">Užsiregistruokite Mūsų Naujienlaiškiui</div>
            <div class="input-container">
                <form>
                    <input type="email" id="tooltip-email-input" placeholder=" Jūsų el. pašto adresas">
                    <input type="submit" id="tooltip-email-submit" value="Registruotis">
                </form>
            </div>
        </div>`;
        tooltip.addEventListener("mouseenter", handleTooltipMouseOver);
        tooltip.addEventListener("mouseleave", handleTooltipMouseOut);

        document.body.append(tooltip);

        let submit = document.body.querySelector("#tooltip-email-submit").parentElement;
        submit.addEventListener("submit", handleSubmit);

        
        tooltip.style.position = "fixed";
        tooltip.style.top = 55 + "px";
        tooltip.style.left = window.innerWidth - tooltip.offsetWidth - 25 + "px";

        function handleTooltipMouseOver() {
            clearTimeout(handleNewsletterOut.timer);
        }

        function handleTooltipMouseOut() {
            handleNewsletterOut("", 1000);
        }
        
        function handleSubmit(e) {
            e.preventDefault();
            console.log('e.target.querySelector("#tooltip-email-input")', 
            e.target.querySelector("#tooltip-email-input").value)
            if (e.target.querySelector("#tooltip-email-input").value === "") return;
            tooltip.innerHTML = `<div class="newsletter-tooltip-container">
            <div class="" id="newsletter-tooltip-title">Jūs sėkmingai užsiregistravote šiuo adresu: ${this.querySelector("#tooltip-email-input").value}</div>`;
            
        }
    }

    function handleNewsletterOut(e, time = 500) {
        if (document.body.querySelector("#tooltip")) {
            handleNewsletterOut.timer = setTimeout(() => document.body.querySelector("#tooltip").remove(), time);
        }
    }

    function handleNavBtn() {
        let div = document.createElement("div"),
            stilius = document.querySelector("#stilius").cloneNode(true),
            kultura = document.querySelector("#kultura"),
            spinta = document.querySelector("#spinta"),
            dovanu_idejos = document.querySelector("#dovanu_idejos");
            console.log('dovanu_idejos', dovanu_idejos)
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.position = "fixed";
        div.style.marginTop = document.body.querySelector(".title-container").getBoundingClientRect().bottom + 20;
        div.style.backgroundColor = "white";
        div.style.top = -window.innerHeight + "px";
        div.style.transition = "top 0s";
        setTimeout(() => div.style.top = 0 + "px");
        div.append(stilius);
        div.append(kultura);
        div.append(spinta);
        div.append(dovanu_idejos);
        document.body.append(div);

        function styler(elem) {
            return `<div class="nav-container">` + elem + `</div>`;
        }
    }