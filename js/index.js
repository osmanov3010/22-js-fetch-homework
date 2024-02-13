const baseUrl = 'https://api.apilayer.com/fixer';
const apiKey = '5dMz5E9AR7ZuvRoN5xip0wAbrIyFrhZ0';



getAllSymbols();


convert.onclick = () => {

    let f = from.options[from.selectedIndex].value;
    let t = to.options[to.selectedIndex].value;

    if (f == t){
        alert("Currencies FROM and TO must be different");
        return;
    }

    if (from.value.trim().length > 0 && to.value.trim().length > 0 && sum.value.length > 0) {

        convert.disabled = true; // Disable button while fetching
        showHideLoader();
        result.classList.add('hidden');

        fetch(`${baseUrl}/convert?from=${f}&to=${t}&amount=${sum.value}`, {
            headers: {
                'apikey': apiKey
            }
        })
            .then(result => {
                if (result.ok) {
                    return result.json();
                } else {
                    throw new Error(result);
                }
            })
            .then(data => {
                result.textContent = `Result: ${data.result}`;
            })
            .catch(e => {
                result.textContent = `Error: ${e}`;
            })
            .finally(() => {
                convert.disabled = false;
                result.classList.remove('hidden');
                showHideLoader();
            })
    } else {
        alert('Please, fill all fields')
    }

}


function getAllSymbols() {
    fetch(`${baseUrl}/symbols`, {
        headers: {
            'apikey': apiKey
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error();
            }
            // } else if(response.status === 401){
            //     result.textContent = "Unautorized";   //Непонятно как 401 обрабатывать в таком случае
            //     console.log(response.status);  
            // } 
        })
        .then(obj => {
            for (key in obj.symbols) {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = `${key} - ` + obj.symbols[key];
                to.appendChild(option);
                from.appendChild(option.cloneNode(true));
            }
            showActionPanel();
        })
        .catch(e => {
            result.textContent = ":( SOME ERROR... see console";
            console.log(e);
        })
        .finally(() => {
            showHideLoader();
        });
}

function showHideLoader() {
    const div = document.querySelector('.loader');
    if (div.classList.contains('hidden')) {
        div.classList.remove('hidden');

    } else {
        div.classList.add('hidden');
    }
}

function showActionPanel() {
    const actions = document.querySelector('.actions');
    actions.classList.remove('hidden');
}
