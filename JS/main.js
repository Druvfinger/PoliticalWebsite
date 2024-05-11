const urlBase = "http://127.0.0.1:8080/";


async function makeCall(url) {
    try {
        const response = await fetch(url, {
            method: 'GET', // GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}
async function getPartySubjects(partyAbbreviation) {
    let url = urlBase + "subjects/party?partyAbbreviation=" + partyAbbreviation;
    try {
        const data = await makeCall(url);  // Wait for the makeCall promise to resolve
        if (Array.isArray(data)) {
            const names = data.map(item => item.name); // Map each item to just the name property
            //console.log(names);
            return names;  // Return the array of names
        } else {
            console.error('Expected an array but received:', data);
            return [];  // Return an empty array to handle error gracefully
        }
    } catch (error) {
        console.error('Error processing data: ', error);
        return [];  // Return an empty array to handle error
    }
}

async function displayPartySubjects(partyAbbreviation, imgUrl, dropdownId){
    let imgId;
    let subjectDropDownId;
    if(dropdownId.endsWith('2')){
        imgId = 'logo_dropdown2';
        subjectDropDownId = 'subjectList2'
    } else {
        imgId = 'logo_dropdown1';
        subjectDropDownId = 'subjectList1'
    }
    
    switch(partyAbbreviation){
       case 'SD': 
            document.getElementById(dropdownId).textContent = 'Sverigedemokraterna';
            break;
       case 'M':  
            document.getElementById(dropdownId).textContent = 'Moderaterna';
            break;
       case 'L':  
            document.getElementById(dropdownId).textContent = 'Liberalerna';
            break;
       case 'KD': 
            document.getElementById(dropdownId).textContent = 'Kristdemokraterna';
            break;
       case 'C':  
            document.getElementById(dropdownId).textContent = 'Centerpartiet';
            break;
       case 'S':  
            document.getElementById(dropdownId).textContent = 'Socialdemokraterna';
            break;
       case 'MP': 
            document.getElementById(dropdownId).textContent = 'Miljöpartiet';
            break;
       case 'V':  
            document.getElementById(dropdownId).textContent = 'Vänsterpartiet';
            break;
    }
    document.getElementById(imgId).src = imgUrl
    if(subjectDropDownId.endsWith('1')){
        document.getElementById('dropdownMenuButton3').hidden = false
    } else {
        document.getElementById('dropdownMenuButton4').hidden = false
    }
    
   
    getPartySubjects(partyAbbreviation).then(subjects => {
        // Sort the subjects alphabetically
        subjects.sort((a, b) => a.localeCompare(b));
        // Iterate through each sorted subject
        subjects.forEach(subject => {
            let newItem = document.createElement('li');
            let icon = document.createElement('i')
            let link = document.createElement('a');       // Create a new <a> element
            icon.classList.add('bi', 'bi-dot')
            link.setAttribute('href', '#');               // Set href attribute (change '#' to your URL if needed)
            link.textContent = subject;                   // Set the text content to the subject name
            link.classList.add('text-decoration-none', 'text-secondary', 'ms-2');  // Add Bootstrap classes for styling
            newItem.appendChild(icon)
            newItem.appendChild(link);
            document.getElementById(subjectDropDownId).appendChild(newItem);
        });
    })
    .catch(error => {
        console.error('Failed to fetch subjects:', error);
    });
}