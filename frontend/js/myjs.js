$(document).ready(async function () {
	// Init of sessionStorage and page information
	if (!window.sessionStorage.getItem('sortMethod')) {
		window.sessionStorage.setItem('sortMethod', 'None')
	}
	const phones = await (await fetch('http://localhost:11000/phones/')).json() // init
	// Get phone info
	const identifier = new URLSearchParams(location.search);
    const currentPhone = await phones.find(curr => curr.identifier == identifier.get("identifier"));
	// Sort phone comments by like/dislike difference if sorting is enabled
	if (currentPhone != undefined) {
		changeSort(true)
		if ("Like".localeCompare(window.sessionStorage.getItem('sortMethod')) == 0) {
			(currentPhone.comments).sort((a,b) => {return  (b.likes - b.dislikes) - (a.likes - a.dislikes)})
		} else if ("Dislike".localeCompare(window.sessionStorage.getItem('sortMethod')) == 0 ) {
			(currentPhone.comments).sort((a,b) => {return  (a.likes - a.dislikes) - (b.likes - b.dislikes)})
		}
	}
		
	$.each(phones, function(id, phone) {
		$("#phone-desc").append(`
			<div class="col-6 shadow-sm p-3 mb-5 bg-white rounded">
			<a href="phone.html?identifier=${phone.identifier}">
				<img src="${phone.image}" class="rounded float-left img-fluid" alt="${phone.name}" width = "250" align="left"/>
			</a>
			<table class="display-table">
			</br>
			  <tr>
				<th>Model</th>
				<th>${phone.model}</th>
				 </tr>
				 <tr>
				<th>Brand</th>
				<th>${phone.brand}</th>
			  </tr>
			  <tr>
				<th>Operating system</th>
				<th>${phone.os}</th>
				 </tr>
				 <tr>
				<th>Price</th>
				<th>${phone.price}</th>
				  </tr>
			</table>
			
			</br>
			<span>${averageReview(phone.comments)}☆ (Reviews: ${(phone.comments).length})</span>
			</div>
	`)
	$("#navbarJS").append(`
	<a class="dropdown-item" href="phone.html?identifier=${phone.identifier}">${phone.name}</a>
	`)
	})
	$("#basicInfo").append(`
				<div class="col-md-6">
					<span>
						<img src="${currentPhone.image}" class="img-fluid" alt="${currentPhone.model}" width = "350" align = "left"/>
						<p class = "lead">
							<h1>${currentPhone.name}</h1>
							<h1>Price: <span class = "red">${currentPhone.price}</h2></span>
						</p>
					</span>
				</div>
				<div class="col-md-6">
					</br>
					<div class = "shadow p-3 mb-5 bg-white rounded">
						<p>
						<ul class = "my-list">
							<li><b>Operating System: </b>${currentPhone.os}</li>
							<li><b>Screen diagonal: </b>${currentPhone.screenDia}</li>
							<li><b>RAM Memory: </b>${currentPhone.RAM}</li>
							<li><b>Internal memory: </b>${currentPhone.internalMemory}</li>
							<li><b>Back camera: </b>${currentPhone.backCam}</li>
							<li><b>Battery capacity: </b>${currentPhone.batCapacity}</li>
							<li><b>Screen resolution: </b>${currentPhone.screenRes}</li>
							<li><b>Screen type: </b>${currentPhone.screenType}</li>
						</ul>
						<span class = "large-stars">${averageReview(currentPhone.comments)}☆ (${(currentPhone.comments).length})</span>
						</p>
					</div>
				</div>
	`)
	$("#tableJS").append(`
				<table class="my-table">
				  <tr>
					<th>Screen type</th>
					<th>${currentPhone.screenType}</th>
				  </tr>
				  <tr>
					<th>Touch sensitive</th>
					<th>${currentPhone.touchSensitive}</th>
				  </tr>
				  <tr>
					<th>Number of colours</th>
					<th>${currentPhone.numberOfColours}</th>
				  </tr>
				  <tr>
					<th>Screen diagonal</th>
					<th>${currentPhone.screenDia}</th>
				  </tr>
				  <tr>
					<th>Resolution</th>
					<th>${currentPhone.screenRes}</th>
				  </tr>
				  <tr>
					<th>Operating system</th>
					<th>${currentPhone.os}</th>
				  </tr>
				  <tr>
					<th>RAM Memory</th>
					<th>${currentPhone.RAM}</th>
				  </tr>
				  <tr>
					<th>Number of cores</th>
					<th>${currentPhone.numOfCores}</th>
				  </tr>
				  <tr>
					<th>Processor type</th>
					<th>${currentPhone.processorType}</th>
				  </tr>
				  <tr>
					<th>Processor description</th>
					<th>${currentPhone.processorDesc}</th>
				  </tr>
				  <tr>
					<th>Chipset</th>
					<th>${currentPhone.chipset}</th>
				  </tr>
				  <tr>
					<th>Graphics</th>
					<th>${currentPhone.graphics}</th>
				  </tr>
				  <tr>
					<th>Internal Memory</th>
					<th>${currentPhone.internalMemory}</th>
				  </tr>
				  <tr>
					<th>Internal Memory Extension</th>
					<th>${currentPhone.internalMemoryExtensions}</th>
				  </tr>
				  <tr>
					<th>Back camera</th>
					<th>${currentPhone.backCam}</th>
				  </tr>
				  <tr>
					<th>Stabilization</th>
					<th>${currentPhone.stabilization}</th>
				  </tr>
				  <tr>
					<th>Front camera</th>
					<th>${currentPhone.frontCamera}</th>
				  </tr>
				  <tr>
					<th>WiFi</th>
					<th>${currentPhone.wifi}</th>
				  </tr>
				  <tr>
					<th>Bluetooth</th>
					<th>${currentPhone.bluetooth}</th>
				  </tr>
				  <tr>
					<th>GPS</th>
					<th>${currentPhone.gps}</th>
				  </tr>
				  <tr>
					<th>GPS specs</th>
					<th>${currentPhone.gpsSpecs}</th>
				  </tr>
				  <tr>
					<th>NFC</th>
					<th>${currentPhone.nfc}</th>
				  </tr>
				  <tr>
					<th>Fast charge</th>
					<th>${currentPhone.fastCharge}</th>
				  </tr>
				  <tr>
					<th>Wireless charging</th>
					<th>${currentPhone.wirelessCharging}</th>
				  </tr>
				  <tr>
					<th>Keyboard</th>
					<th>${currentPhone.keyboard}</th>
				  </tr>
				  <tr>
					<th>Battery capacity</th>
					<th>${currentPhone.batCapacity}</th>
				  </tr>
				  <tr>
					<th>SIM slot</th>
					<th>${currentPhone.simSlot}</th>
				  </tr>
				  <tr>
					<th>SIM slot type</th>
					<th>${currentPhone.simSlotType}</th>
				  </tr>
				  <tr>
					<th>Colours</th>
					<th>${currentPhone.colours}</th>
				  </tr>
				  <tr>
					<th>2G</th>
					<th>${currentPhone.twoG}</th>
				  </tr>
				  <tr>
					<th>3G</th>
					<th>${currentPhone.threeG}</th>
				  </tr>
				  <tr>
					<th>4G (LTE)</th>
					<th>${currentPhone.fourG}</th>
				  </tr>
				  <tr>
					<th>Dimensions</th>
					<th>${currentPhone.dimensions}</th>
				  </tr>
				  <tr>
					<th>Weight</th>
					<th>${currentPhone.weight}</th>
				  </tr>
				  <tr>
					<th>Other</th>
					<th class><a href = "${currentPhone.link}" target="_blank">Product website</a></th>
				  </tr>
				</table>
	`)
	$("#titleJS").append(`${currentPhone.name}`)
	$("#collapseTwo").append(`
			<div class="card-body">
				<div class="row">
					<span class="col-md-6">
						<div class = "container my-iframe-container">
							<iframe class="responsive-iframe" align="center"
								src="${currentPhone.vidReview}">
							</iframe>
						</div>
					</span>
					<div class="col-md-6 p-3 mb-5 bg-white rounded" align="left">
						<article>
							<section>
								<p>${currentPhone.professionalReview}</p>
								<p>Click <a href="${currentPhone.professionalReviewOrigin}" target="_blank">here</a> to see the full review.<p>
							</section>
						</article>
					
					
						<br>
						<div class="chip">
							<img src="https://benjaminjurke.com/assets/images/authors/benjamin-jurke-v6.jpg"
							<a href="https://www.youtube.com/user/TechRadar">TechRadar</a>, ${currentPhone.professionalReviewRating}
						</div>
					</div>
				</div>
			</div>
	`)
	$.each(currentPhone.comments, function(index, komentar) {
		let string_a = `
		<div class = "comment-b"><p><b>${komentar.rating}/5 - ${komentar.title}</b>
			</br>
			${komentar.review}
			</br></br>
			<div class = "comment-reactions">
					${komentar.likes} 
					<span class = "green">✓</span>
					&nbsp &nbsp ${komentar.dislikes} 
					<span class = "red">X</span>
			</div>`
		let string_b = `<form id="reply-form${komentar._id}" align = "right" class="my-reply-form")>
		<input type="button" id="agree" class = "btn btn-responsive btn-success" value="Agree" onclick="agree_func('${komentar._id}','${currentPhone._id}', ${index})">
		<input type="button" id="reply" class ="btn btn-responsive btn-warning" value="Reply" onclick="reply_func('${komentar._id}','${currentPhone._id}', ${index}, document.getElementById('userReply${komentar._id}'))">
		<input type="button" id="disagree" class = "btn btn-responsive btn-danger" value="Disagree" onclick="disagree_func('${komentar._id}','${currentPhone._id}', ${index})">
		</br></br>
		<textarea class = "form-control" id="userReply${komentar._id}" rows="4" cols="60" placeholder="Type your reply here and then press 'Reply'."></textarea>
		</form>
	</p>
`		
		let string_c = ''
		console.log(komentar.reply.length)
		if (komentar.reply.length > 0) {
			string_c += `</br></br><div class="replyGroup${index}" id="${komentar._id}" style="margin-left:8px">`
			for (let indexReply = 0; indexReply < komentar.reply.length; indexReply++) {
				const currReply = komentar.reply[indexReply];
				string_c += `<h6>Reply ${indexReply + 1}:</h6>
				<p>${currReply}</p>
				`
			}
			string_c += '</div>'
			$('#commentSection').append(string_a + string_c + string_b)
		}
		else{
			$('#commentSection').append(string_a + string_b + '</div>')
		}
	})
	$('#comment-review').submit(async (evt) => { // Add comment
		evt.preventDefault()
		let newComment = $('#comment-review').serializeArray()
		let toSend = {'title': newComment[0].value, 'review': newComment[1].value, 'rating': parseInt(newComment[2].value)}
		if (toSend.review == '' || toSend.title == ''){
			return
		}
		console.log(currentPhone._id)
		console.log(toSend)
		await fetch('http://localhost:11000/phones/' + currentPhone._id + '/comment', {
			method: 'POST',
			headers: {
				'Accept':'application/json',
				'Content-Type':'application/json'
			},
			body: JSON.stringify(toSend)
		}).then(location.reload())
	})
})

function agree_func(kom_id, phone_id, idx) { // Like comment
	if ('INTERACTED'.localeCompare( window.sessionStorage.getItem(kom_id)) == 0) {
		console.log('Failure!')
		return
	}
	let uri = 'http://localhost:11000/phones/ld/' + phone_id + '/' + kom_id
	fetch(uri, {
		method: 'PATCH',
		headers: {
			'Accept':'application/json',
			'Content-Type':'application/json'
		},
		body: JSON.stringify(
		{"isLike": true}
		)
	}).then( () => {
		sessionStorage.setItem(kom_id, 'INTERACTED')
		location.reload(true)
	})
}
function disagree_func(kom_id, phone_id, idx) { // Dislike comment
	if ('INTERACTED'.localeCompare( window.sessionStorage.getItem(kom_id)) == 0) {
		console.log('Failure!')
		return
	}
	let uri = 'http://localhost:11000/phones/ld/' + phone_id + '/' + kom_id
	fetch(uri, {
		method: 'PATCH',
		headers: {
			'Accept':'application/json',
			'Content-Type':'application/json'
		},
		body: JSON.stringify(
		{"commentIndex": idx, "isLike": false}
		)
	}).then( () => {
		sessionStorage.setItem(kom_id, 'INTERACTED')
		location.reload(true)
	})
}

function reply_func(kom_id, phone_id, idx, ref) { // Post Admin reply
	console.log(ref.value)
	let uri = 'http://localhost:11000/phones/reply/' + kom_id
	if (String(ref.value).length == 0) {
		return
	}
	fetch(uri, {
		method: 'PATCH',
		headers: {
			'Accept':'application/json',
			'Content-Type':'application/json'
		},
		body: JSON.stringify(
		{"myReply": ref.value}
		)
	}).then(location.reload())
}

function averageReview(comments) { // Calc avg review
	let reviewSum = 0
	if (comments.length == 0){
		return reviewSum
	}
	for (i = 0; i < comments.length; ++i) {
		reviewSum += comments[i].rating
	}
	let returnVal = Math.round(reviewSum/comments.length)
	return returnVal
}

function changeSort(force = false) { // Toggle sort, called in phone.html
	let sortLikePath = "./images/sortLikes.png"
	let sortDislikePath = "./images/sortDislikes.png"
	let sortNonePath = "./images/sortNone.png"
	if (force) {
		if ("Like".localeCompare(window.sessionStorage.getItem('sortMethod')) == 0) {
			document.getElementById('sortImg').src  = sortLikePath;
		} else if ("Dislike".localeCompare(window.sessionStorage.getItem('sortMethod')) == 0 ) {
			document.getElementById('sortImg').src  = sortDislikePath;
		} else {
			document.getElementById('sortImg').src  = sortNonePath;
		}
	} else {
		if ("None".localeCompare(window.sessionStorage.getItem('sortMethod')) == 0) {
			window.sessionStorage.setItem('sortMethod', "Like")
			document.getElementById('sortImg').src  = sortLikePath;
		} else if ("Like".localeCompare(window.sessionStorage.getItem('sortMethod')) == 0 ) {
			window.sessionStorage.setItem('sortMethod', "Dislike")
			document.getElementById('sortImg').src  = sortDislikePath;
		} else {
			window.sessionStorage.setItem('sortMethod', "None")
			document.getElementById('sortImg').src  = sortNonePath;
		}
	}

	console.log('Status: ' + window.sessionStorage.getItem('sortMethod') )
}