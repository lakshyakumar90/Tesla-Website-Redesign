document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Initialize Lenis smooth scrolling
  const initSmoothScrolling = () => {
    const lenis = new Lenis({
      lerp: 1,
      smooth: true,
    });

    lenis.on("scroll", () => ScrollTrigger.update());

    const scrollFn = (time) => {
      lenis.raf(time);
      requestAnimationFrame(scrollFn);
    };

    requestAnimationFrame(scrollFn);
  };
  initSmoothScrolling();
});

function loader(){
  document.querySelector(".loader-welcome img").style.opacity = 0
  document.body.style.overflow = "hidden";


  function startLoader(){
  let counterElement = document.querySelector(".counter>h1")
  let currentValue = 0

  function updateCounter(){
    if(currentValue == 100){
      return;
    }

    currentValue += Math.floor(Math.random() * 10 ) + 1;

    if(currentValue > 100 ){
      currentValue = 100;
    }

    counterElement.textContent = currentValue

    let delay = Math.floor(Math.random() * 200 ) + 50
    setTimeout(updateCounter, delay)

  } 

  updateCounter()
  }
  startLoader()

  gsap.to(".loader-welcome img",{
    opacity:1,
    duration:2,
    ease: "power3.inOut"
  })

  let tl = gsap.timeline()

  tl.to(".counter",2,{
    delay:3.5,
    opacity:0
  },'a')

  tl.to(".bar",1.5, {
    delay:3.5,
    height:0,
    stagger:{
      amount:0.5
    },
    ease: "power3.inOut"
  },'a')

  tl.to("body", {
    overflow : "visible"
  })

  tl.to(".counter, .loader-overlay",{
    display:"none"
  })
}

function nav() {
  let lastScrollTop = 0;
  const navbar = document.getElementById("nav");
  const threshold1 = window.innerHeight * 3.2;
  const threshold2 = window.innerHeight * 3.5;
  const menuItems = document.querySelectorAll(".McButton > b");

  function setNavbarInitialStyles() {
    navbar.style.backgroundColor = "transparent";
    navbar.style.color = "#fff";
    menuItems.forEach((item) => (item.style.backgroundColor = "#fff"));
  }

  function setNavbarHoverStyles() {
    navbar.style.backgroundColor = "white";
    navbar.style.color = "#000";
    menuItems.forEach((item) => (item.style.backgroundColor = "#000"));
  }

  navbar.addEventListener("mouseenter", function () {
    setNavbarHoverStyles();
  });

  navbar.addEventListener("mouseleave", function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > threshold1) {
      navbar.style.backgroundColor = "white";
      navbar.style.color = "#000";
      menuItems.forEach((item) => (item.style.backgroundColor = "#000"));
    } else {
      setNavbarInitialStyles();
    }
  });

  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > threshold1) {
      navbar.style.backgroundColor = "white";
      navbar.style.color = "#000";
      menuItems.forEach((item) => (item.style.backgroundColor = "#000"));

      if (scrollTop > lastScrollTop && scrollTop > threshold2) {
        navbar.style.top = "-160px";
      } else {
        navbar.style.top = "0";
      }
    } else {
      setNavbarInitialStyles();
      navbar.style.top = "0";
    }
    lastScrollTop = scrollTop;
  });

  const button = document.querySelector(".burger-button");
  const mainNav = document.querySelector("#main-nav");
  const hideHoja = document.querySelector("#hide-hoja");
  const teslaSvgPath = document.querySelector(".tesla-svg-path");

  button.addEventListener("click", () => {
    button.classList.toggle("clicked");
    mainNav.classList.toggle("clicked");
    hideHoja.classList.toggle("clicked");
    teslaSvgPath.classList.toggle("clicked");
  });
}

function p1() {
  const tl1 = gsap.timeline(
    {
      scrollTrigger: {
        trigger: "#bg-image",
        start: "top top",
        end: "+=250%",
        scrub: 2,
        pin: "#bg-image",
      },
    },
    "a"
  );

  gsap.to("#bg-image", {
    width: "92%",
    left: "calc(50% - 46%)",
    scrollTrigger: {
      trigger: "#pinned-content",
      start: "top -60%",
      end: "+=150%",
      scrub: 0.5,

    },
  });
}

const animateWords = (el) => {
  gsap.set(el, { "font-kerning": "none" });

  // Apply SplitType
  const st = new SplitType(el, { types: "lines, words" });
  const lines = st.lines;

  const tl = gsap
    .timeline({
      delay: 1,
      scrollTrigger: {
        trigger: el,
        start: "center center",
        end: "+=100%",
        scrub: true,
        pin: el,
      },
    })
    .set(el, { perspective: 1000 });

  for (const [linepos, line] of lines.entries()) {
    gsap.set(line, { transformStyle: "preserve-3d" });

    const words = line.querySelectorAll(".word");

    tl.to(
      words,
      {
        ease: "back.inOut",
        opacity: 0,
        rotationY: (pos, _, arr) =>
          pos > arr.length / 2
            ? Math.abs(pos - arr.length / 2) * -15
            : Math.abs(pos - arr.length / 2) * 15,
        z: () => gsap.utils.random(-1000, -500),
        stagger: {
          each: 0.02,
          from: "center",
        },
      },
      linepos * 0.05
    );
  }
};

const scroll = () => {
  [...document.querySelectorAll("[data-split]")].forEach((el) => {
    animateWords(el);
  });
};

function page2() {
  let allh1 = document.querySelectorAll("#page2 h1");
  allh1.forEach(function (elem) {
    let content = "";
    h1 = elem.textContent;
    let splittedText = h1.split("");
    splittedText.forEach(function (e) {
      content += `<span>${e}</span>`;
    });
    elem.innerHTML = content;
  });

  gsap.to("#page2 h1 span", {
    scrollTrigger: {
      trigger: "#page2 h1",
      start: "top 75%",
      end: "+=40%",
      scrub: 2,
    },
    color: "#000",
    stagger: 0.05,
    ease: "power2.inOut",
  });

  gsap.to("#page2-p1", {
    opacity: 1,
    scrollTrigger: {
      trigger: "#page2-p1",
      start: "top 70%",
      end: "+=50%",
      scrub: 1,
    },
  });

  const photos = gsap.utils.toArray(".desk-img:not(:first-child)");
  gsap.set(photos, { yPercent: 101, scale: 3, transformOrigin: "top center" });

  const animation = gsap.to(photos, {
    yPercent: 0,
    scale: 1,
    duration: 1,
    stagger: 1,
  });

  ScrollTrigger.create({
    trigger: "#scroll-effect",
    start: "top top",
    end: "bottom bottom",
    pin: "#scroll-right",
    animation: animation,
    scrub: true,
  });
}

function canvas() {
  const canvas = document.querySelector("#canvas canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
  
  https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00001.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00002.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00003.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00004.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00005.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00006.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00007.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00008.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00009.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00010.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00011.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00012.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00013.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00014.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00015.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00016.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00017.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00018.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00019.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00020.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00021.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00022.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00023.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00024.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00025.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00026.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00027.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00028.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00029.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00030.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00031.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00032.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00033.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00034.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00035.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00036.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00037.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00038.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00039.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00040.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00041.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00042.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00043.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00044.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00045.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00046.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00047.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00048.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00049.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00050.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00051.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00052.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00053.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00054.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00055.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00056.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00057.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00058.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00059.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00060.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00061.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00062.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00063.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00064.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00065.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00066.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00067.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00068.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00069.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00070.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00071.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00072.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00073.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00074.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00075.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00076.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00077.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00078.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00079.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00080.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00081.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00082.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00083.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00084.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00085.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00086.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00087.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00088.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00089.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00090.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00091.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00092.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00093.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00094.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00095.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00096.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00097.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00098.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00099.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00100.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00101.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00102.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00103.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00104.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00105.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00106.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00107.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00108.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00109.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00110.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00111.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00112.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00113.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00114.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00115.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00116.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00117.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00118.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00119.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00120.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00121.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00122.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00123.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00124.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00125.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00126.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00127.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00128.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00129.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00130.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00131.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00132.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00133.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00134.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00135.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00136.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00137.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00138.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00139.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00140.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00141.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00142.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00143.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00144.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00145.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00146.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00147.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00148.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00149.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00150.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00151.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00152.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00153.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00154.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00155.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00156.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00157.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00158.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00159.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00160.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00161.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00162.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00163.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00164.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00165.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00166.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00167.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00168.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00169.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00170.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00171.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00172.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00173.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00174.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00175.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00176.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00177.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00178.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00179.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00180.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00181.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00182.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00183.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00184.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00185.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00186.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00187.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00188.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00189.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00190.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00191.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00192.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00193.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00194.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00195.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00196.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00197.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00198.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00199.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00200.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00201.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00202.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00203.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00204.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00205.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00206.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00207.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00208.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00209.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00210.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00211.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00212.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00213.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00214.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00215.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00216.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00217.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00218.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00219.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00220.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00221.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00222.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00223.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00224.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00225.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00226.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00227.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00228.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00229.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00230.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00231.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00232.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00233.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00234.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00235.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00236.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00237.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00238.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00239.jpg
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Media-Scanner-LHD-Slide-00240.jpg
  
  `;
    return data.split("\n")[index];
  }

  const frameCount = 240;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.5,
      trigger: `#canvas`,
      start: `top top`,
      end: `350% top`,
      // scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
    trigger: "#canvas",
    pin: true,
    start: `top top`,
    end: `350% top`,
  });

gsap.to("#canvas img",{
  display:"none",
  scrollTrigger:{
    trigger: "#canvas img",
    start: "top top",
    end: "+=1%",
    scrub:.2,
    ease: "none",
  }
})
}

function page3() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#showcase-pin",
      start: "top top",
      end: "+=880%",
      scrub: 1,
      y: "950%",
      pin: true,
    },
  });

  tl.to(".showcase-ctn", {
    scrollTrigger: {
      trigger: "#showcase-pin",
      start: "top top",
      end: "+=150%",
      scrub: 1,
    },
    "clip-path": " inset(0% 0% 100%)",
    ease: Power2,
  });

  gsap.to(".texte-circle-img", {
    rotation: 360,
    duration: 10,
    repeat: -1,
    ease: "linear",
  });

  tl.to("#showcase-pin", {
    scrollTrigger: {
      trigger: "#showcase-scroll>h1",
      start: "top top",
      end: "+=130%",
      scrub: 1,
    },
    scale: (0.5, 0.5),
  });

  tl.to("#showcase-pin", {
    scrollTrigger: {
      trigger: "#showcase-scroll>h2",
      start: "top top",
      end: "+=130%",
      scrub: 1,
    },
    scale: (1, 1),
  });
}

function slides() {
  gsap.to(".energy-header h1", {
    scrollTrigger: {
      trigger: ".energy-header h1",
      start: "top 66%",
      end: "+=60%",
      scrub: 2,
    },
    color: "#000",
    stagger: 0.5,
    ease: "power2.inOut",
  });

  // let tl = gsap.timeline();

  // tl.to(".slide", {
  //   scrollTrigger: {
  //     trigger: ".slides",
  //     start: "top top",
  //     end: "+=500%",
  //     scrub: 1,
  //     pin: true,
  //     stagger: 0.3,
  //   },
  //   x: "-400%",
  //   scale: 1.1,
  // });

  const photos = gsap.utils.toArray(".slide:not(:first-child)");
  gsap.set(photos, { yPercent: 101, transformOrigin: "top center" });

  const animation = gsap.to(photos, {
    yPercent: 0,
    duration: 1,
    stagger: 1,
  });

  ScrollTrigger.create({
    trigger: ".slides",
    start: "top top",
    end: "+=500%",
    pin: ".slides",
    animation: animation,
    scrub: true,
  });
}

function page5() {
  let allh1 = document.querySelectorAll(".page5-header h1");
  allh1.forEach(function (elem) {
    let content = "";
    h1 = elem.textContent;
    let splittedText = h1.split("");
    splittedText.forEach(function (e) {
      content += `<span>${e}</span>`;
    });
    elem.innerHTML = content;
  });

  gsap.to(".page5-header h1 span", {
    scrollTrigger: {
      trigger: ".page5-header h1",
      start: "top 75%",
      end: "+=40%",
      scrub: 2,
    },
    color: "#000",
    stagger: 0.05,
    ease: "power2.inOut",
  });


  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#charge-pin",
      start: "top top",
      end: "+=200%",
      scrub: 1,
      pin: true,
    },
  });

  tl.to("#charge1", {
    scrollTrigger: {
      trigger: "#charge-pin",
      start: "top top",
      end: "+=100%",
      scrub: 1,
    },
    "clip-path": " inset(0% 0% 100%)",
    ease: Power2,
  });

  tl.to("#charge2", {
    scrollTrigger: {
      trigger: "#charge1",
      start: "top -100%",
      end: "+=100%",
      scrub: 1,
    },
    "clip-path": " inset(0% 0% 100%)",
    ease: Power2,
  });
}

function page6() {
  let tl = gsap.timeline();

  tl.to("#main", {
    scrollTrigger: {
      trigger: "#page6",
      start: "top 50%",
      end: "+=20%",
      scrub: 1,
    },
    backgroundColor: "#222",
  });

  let tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page6",
      start: "bottom -100%",
      end: "+=1%",
      scrub: 1,
    },
  });

  tl1.to("#main", {
    backgroundColor: "#dadada",
  });

  tl.to("#page6", {
    scrollTrigger: {
      trigger: ".page6-pin",
      start: "top top",
      end: "+=220%",
      scrub: 1,
      pin: true,
    },
  });

  tl.to("#page6 h1", {
    scrollTrigger: {
      trigger: "#page6",
      start: "top 30%",
      end: "+=20%",
      scrub: 1,
    },
    opacity: 1,
  });

  let tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#pin-img",
      start: "top 35%",
      end: "+=120%",
      scrub: 1,
      pin: true,
    },
  });

  tl2.to("#pin-img", {
    scale: 1,
  });
}

function footer(){
  if(window.innerWidth>768){
    gsap.to(".foot-scroll",{
      scrollTrigger: {
        trigger: ".footer",
        start: "top top",
        end: "+=220%",
        scrub: 1,
        pin: true,
      },
      x:"-200%"
    })
  }

  if(window.innerWidth <= 768){
    gsap.to(".foot-scroll",{
      scrollTrigger: {
        trigger: ".footer",
        start: "top top",
        end: "+=220%",
        scrub: 1,
        pin: true,
      },
      x:"-270%"
    })
  }
}

function canvas1() {
  const canvas = document.querySelector("#canvas1 canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0001.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0002.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0003.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0004.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0005.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0006.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0007.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0008.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0009.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0010.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0011.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0012.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0013.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0014.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0015.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0016.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0017.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0018.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0019.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0020.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0021.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0022.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0023.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0024.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0025.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0026.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0027.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0028.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0029.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0030.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0031.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0032.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0033.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0034.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0035.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0036.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0037.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0038.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0039.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0040.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0041.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0042.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0043.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0044.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0045.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0046.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0047.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0048.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0049.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0050.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0051.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0052.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0053.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0054.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0055.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0056.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0057.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0058.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0059.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0060.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0061.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0062.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0063.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0064.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0065.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0066.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0067.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0068.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0069.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0070.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0071.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0072.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0073.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0074.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0075.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0076.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0077.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0078.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0079.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0080.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0081.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0082.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0083.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0084.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0085.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0086.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0087.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0088.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0089.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0090.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0091.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0092.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0093.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0094.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0095.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0096.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0097.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0098.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0099.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0100.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0101.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0102.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0103.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0104.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0105.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0106.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0107.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0108.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0109.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0110.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0111.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0112.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0113.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0114.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0115.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0116.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0117.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0118.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0119.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0120.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0121.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0122.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0123.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0124.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0125.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0126.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0127.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0128.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0129.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0130.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0131.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0132.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0133.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0134.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0135.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0136.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0137.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0138.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0139.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0140.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0141.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0142.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0143.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0144.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0145.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0146.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0147.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0148.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0149.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0150.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0151.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0152.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0153.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0154.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0155.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0156.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0157.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0158.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0159.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0160.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0161.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0162.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0163.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0164.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0165.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0166.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0167.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0168.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0169.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0170.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0171.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0172.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0173.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0174.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0175.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0176.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0177.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0178.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0179.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0180.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0181.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0182.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0183.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0184.jpg
./Assets/media/canvas/Charging/aspose_video_133661107269338471_out0185.jpg
  `;
    return data.split("\n")[index];
  }

  const frameCount = 185;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.5,
      trigger: `#canvas1`,
      start: `top top`,
      end: `350% top`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
    trigger: "#canvas1",
    pin: true,
    start: `top top`,
    end: `+=350%`,
  });

gsap.to("#canvas1 img",{
  display:"none",
  scrollTrigger:{
    trigger: "#canvas1 img",
    start: "top top",
    end: "+=1%",
    scrub:.2,
    ease: "none",
  }
})
}

nav();
p1();
scroll();
page2();
canvas()
page3();
slides();
canvas1()
page5();
page6();
footer()
loader()