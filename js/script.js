/*-------------------------- TYPING ANIMATION ------------------------------*/

var typed = new Typed(".typing",{
    strings:["","Computer Programmer","Web Developer", "Freelancer", "Lifelong Learner"],
    typeSpeed:90,
    BackSpeed:60,
    loop:true
});


/* ---------------------------- ASIDE NAV BAR --------------------------- */
const nav = document.querySelector(".nav"),
        navList = nav.querySelectorAll("li"),
        totalNavList = navList.length,
        allSection = document.querySelectorAll(".section"),
        totalSection = allSection.length;
        for(let i = 0; i <totalNavList; i++)
        {
            const a =navList[i].querySelector("a");
            a.addEventListener("click", function()
            {

                for(let i = 0; i < totalSection; i++)
                {
                    allSection[i].classList.remove("back-section");
                }
                    for(let j = 0; j < totalNavList; j++)
                    {
                        if(navList[j].querySelector("a").classList.contains("active"))
                        {
                            // console.log("back-section" + navList[j].querySelector("a"))
                            // addBackSection();
                            allSection[j].classList.add("back-section");
                        }
                        navList[j].querySelector("a").classList.remove("active");
                    }
                    this.classList.add("active")
                    showSection(this);
                    if(window.innerWidth < 1200)
                    {
                        asideSectionTogglerBtn();
                    }
            })
        }

        // function removeBackSection()
        // {
        //     for(let i = 0; i < totalSection; i++)
        //     {
        //          allSection[i].classList.remove("back-section");
        //     }
        // }

        // function addBackSection(num)
        // {
        //     allSection[num].classList.add("back-section");
        // }

        function showSection(element)
        {
           for(let i = 0; i < totalSection; i++)
           {
                allSection[i].classList.remove("active")
           }

           const target = element.getAttribute("href").split("#")[1];
           document.querySelector("#" + target).classList.add("active")
        }

        function updateNav(element)
        {
            for(let i = 0; i < totalNavList; i++)
            {
                navList[i].querySelector("a").classList.remove("active");
                const target = element.getAttribute("href").split("#")[1];
                if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1])
                {
                    navList[i].querySelector("a").classList.add("active");
                }
            }
        }
        // MORE ABOUT ME BUTTON
        document.querySelector(".about-me").addEventListener("click",function()
        {
            showSection(this);
            updateNav(this);
        })

        // CONTACT ME BUTTON
        document.querySelector(".hire-me").addEventListener("click",function()
        {
            const sectionIndex = this.getAttribute("data-section-index");
            showSection(this);
            updateNav(this);   
        })
        const navTogglerBtn = document.querySelector(".nav-toggler"),
            aside = document.querySelector(".aside");
            navTogglerBtn.addEventListener("click", () => 
            {
                asideSectionTogglerBtn();
            })
            function asideSectionTogglerBtn()
            {
                aside.classList.toggle("open");
                navTogglerBtn.classList.toggle("open");
                for(let i = 0; i < totalSection; i++)
                {
                    allSection[i].classList.toggle("open")
                }
            }


// Birthdate to Age Calculator
  // Get the birthdate from the span element
  const birthdateString = "2001-09-13";

  // Create a Date object from the birthdate string
  const birthdate = new Date(birthdateString);

  // Get the current date
  const currentDate = new Date();

  // Calculate the age
  const age = currentDate.getFullYear() - birthdate.getFullYear();

  // Check if the birthday has occurred this year
  if (currentDate.getMonth() < birthdate.getMonth() || (currentDate.getMonth() === birthdate.getMonth() && currentDate.getDate() < birthdate.getDate())) {
      // If not, subtract 1 from the age
      document.getElementById("age").innerText = age - 1;
  } else {
      document.getElementById("age").innerText = age;
  }