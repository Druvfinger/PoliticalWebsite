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

async function displayPartySubjects(partyAbbreviation, imgUrl, dropdownId){
    let imgId;
    let subjectDropDownId;
    let cardId;
    if(dropdownId.endsWith('2')){
        imgId = 'logo_dropdown2';
        subjectDropDownId = 'subjectList2'
        cardId = 'bps2'
    } else {
        imgId = 'logo_dropdown1';
        subjectDropDownId = 'subjectList1'
        cardId = 'bps1'
    }
    document.getElementById(subjectDropDownId).innerHTML = ''

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
        subjects.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name property
        subjects.forEach(subject => {
            let newItem = document.createElement('li');
            let link = document.createElement('a');
            link.setAttribute('href', '#');
            link.textContent = subject.name; // Use the name from the subject object
            link.classList.add('text-decoration-none', 'text-secondary', 'ms-2');
            newItem.appendChild(link);
            newItem.onclick = () => displayBulletPoints(subject.subjectId, subjectDropDownId);
            document.getElementById(subjectDropDownId).appendChild(newItem);
        });
    })
    .catch(error => {
        console.error('Failed to fetch subjects:', error);
    });
}

async function getPartySubjects(partyAbbreviation) {
    let url = urlBase + "subjects/party?partyAbbreviation=" + partyAbbreviation;
    try {
        const data = await makeCall(url);  // Wait for the makeCall promise to resolve
        if (Array.isArray(data)) {
            // Map each item to an object with name and subjectId properties
            const subjects = data.map(item => ({
                name: item.name,
                subjectId: item.id  // Assuming the ID is returned under the property name 'id'
            }));
            return subjects;
        } else {
            console.error('Expected an array but received:', data);
            return [];  // Return an empty array to handle error gracefully
        }
    } catch (error) {
        console.error('Error processing data: ', error);
        return [];  // Return an empty array to handle error
    }
}

async function getSubjectBulletPoints(subjectId){
    let url = urlBase+'bulletpoints/subject?subjectId='+subjectId
    try{
        const data = await makeCall(url);  // Wait for the makeCall promise to resolve
        if (Array.isArray(data)) {
            const bulletpoints = data.map(bps => ({
                bp: bps.bp,
                subject: bps.subject.name,
                source: bps.subject.source
            }));
            console.log(bulletpoints)
            return bulletpoints;
        } else{
            console.error('Expected an array but received:', data);
            return [];  // Return an empty array to handle error gracefully
        }
    } catch (error){
        console.error('Error processing data: ', error);
        return [];  // Return an empty array to handle error
    }
}

async function displayBulletPoints(subjectId, subjectDropDownId){
    
    let cardId;
    let cardBodyId;
    let dropdownId;
    let cardTitleId;
    if(subjectDropDownId.endsWith('1')){ 
        cardId = 'bps1'
        cardBodyId = 'bps1List'
        dropdownId = 'dropdownMenuButton3'
        cardTitleId = 'cardTitle1'
    } 
    else { 
        cardId = 'bps2'
        cardBodyId = 'bps2List'
        dropdownId = 'dropdownMenuButton4'
        cardTitleId = 'cardTitle2'
    }
    document.getElementById(cardTitleId).innerHTML = ''
    document.getElementById(cardBodyId).innerHTML = ''
    document.getElementById(cardId).hidden = false
    

    getSubjectBulletPoints(subjectId).then(bulletpoints => {
        let subject = bulletpoints[0].subject
        document.getElementById(cardTitleId).textContent = subject
        document.getElementById(dropdownId).textContent = subject
        bulletpoints.forEach(bulletpoint => {
            let liElement = document.createElement('li')
            let bpText = document.createTextNode(bulletpoint.bp)
            liElement.appendChild(bpText)
            document.getElementById(cardBodyId).appendChild(liElement)
        })
    })
    .catch(error => {
        console.error('Failed to fetch subjects:', error);
    });
}