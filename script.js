function locoMotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
locoMotive();


function mouseMove() {
    let pageContent = document.querySelector(".page-content");
    let cursor = document.querySelector("#cursor");

    pageContent.addEventListener("mousemove", function (dets) {
        //   console.log(dets.y);
        //crsor moving using eow js
        // cursor.style.left = dets.x+"px";
        // cursor.style.top = dets.y+"px";

        //cursor moving using gsap
        gsap.to(cursor, {
            x: dets.x,
            y: dets.y
        });
    });

    pageContent.addEventListener("mouseenter", function () {
        gsap.to(cursor, {
            scale: 1,
            opacity: 1
        });
    });
    pageContent.addEventListener("mouseleave", function () {
        gsap.to(cursor, {
            scale: 0,
            opacity: 0
        });
    });
}
mouseMove();

function page2Animation(){
    //heading animation
    gsap.from(".page2-top h3,.page2-top h4",{
        y:30,
        stagger:0.2,
        duration:0.50,
        opacity:0,
        scrollTrigger:{
            trigger:".page2",
            scroller:".main",
            // markers:true,
            start:"top 80%",
            end:"top 78%",
            scrub:2,
            opacity:1
        }
    });

    //border animation
    gsap.from(".border-bottom",{
        x:"-100%",
        stagger:0.25,
        duration:2.5,
        // opacity:0,
        scrollTrigger:{
            trigger:".page2",
            scroller:".main",
            // markers:true,
            start:"top 75%",
            end:"top 60%",
            scrub:2,
            // opacity:1
        }
    });

    //element animation
    gsap.from(".elem span h1",{
        y:"100%",
        stagger:0.25,
        duration:1,
        // opacity:0,
        scrollTrigger:{
            trigger:".page2",
            scroller:".main",
            // markers:true,
            start:"top 40%",
            end:"top 37%",
            scrub:2,
            // opacity:1
        }
    });
}
page2Animation();
