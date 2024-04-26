window.addEventListener("load", () => {

    fetchBlogs();
    


    //fetch blogs and on click open modal
    function fetchBlogs(){

        const url = "http://blog.test/api/posts/all";

        let posts = document.querySelector("#posts");
        console.log(posts);
    
        fetch(url)
            .then(response => {
                // The API call was successful!
                console.log('success!', response);

                return response.json();
            
            })
            .then(data => {
                data.forEach(post => {
                    let card = document.createElement("div");
                    card.classList.add('card');
    
                  
                    //make cards fill with data and append to the home page
                    card.innerHTML = `<a href="#" class="h-auto max-w-full rounded-lg block p-6 ml-4 mt-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                        <h5 class="title mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${post.title}</h5>
                        <p class="author font-normal text-gray-700 dark:text-gray-400">${post.author}</p>
                        <p class="published font-normal text-gray-700 dark:text-gray-400">Published: ${post.publishedAt}</p>
                        <p class="font-bold text-gray-700 dark:text-gray-400">Click me to read..</p>
                    </a>`;

                   
                    posts.appendChild(card);

                    card.addEventListener("click", () => {
                        console.log("kliknula si na" + post.id);

                        //make modal
                        const modal = document.createElement("div");
                        modal.classList.add('fixed', 'top-0',  'bg-gray-300/80', 'w-full', 'flex', 'justify-end', 'h-dvh');
                        

                        //add content to modal and button x and title
                         modal.innerHTML =`<div class="flex intems-center justify-center p-4 w-full">
                            <!-- Modal content -->
                            <div class="bg-white rounded-lg shadow min-w-full h-[400px]">
                                <!-- Modal header -->
                                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">${post.title}</h3>
                                    <button type="button" class="btn_modal text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <!-- Modal body -->
                                <div class="p-4 md:p-5 space-y-4">
                                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">${post.content}</p>
                                </div>
                            </div>
                        </div>`;

                        //appending modal to the window 
                        document.body.append(modal);
                        //using 2 functions one for closing modal on esc and another on button X
                        closeModalonEsc(modal);
                        closeModalonX(modal);
                        
                    });

                });
                
            })
            
    }


    //close modal on "Escape"
    function closeModalonEsc(modal) {

        document.addEventListener('keydown', function(e) {
            if(e.key === 'Escape' || e.key === 'Esc'){
                modal.classList.add('hidden');
            } 
        })
    } 


    //close modal on x button
    function closeModalonX(modal) {
         //grab all x buttons on page
         let btns = document.querySelectorAll('.btn_modal');
        
         //removing modal on click on X button by putting modal on dispay none
         btns.forEach((btn) => {

             btn.addEventListener('click', function() {
                 modal.classList.add('hidden');
             })
         })  
    }



});



