

function deleteUser(e) {
	console.log(e.dataset.id)
	const userId = e.dataset.id
	const xhr = new XMLHttpRequest()
	xhr.open('post', 'http://localhost:3000/userlist/deleteUser', true)
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.onreadystatechange = function() {
		console.log(xhr.readyState)
		if (xhr.readyState === 4) {
			console.log(xhr.getResponseHeader('Content-Type'))
			if (xhr.getResponseHeader('Content-Type').indexOf('application/json') !== -1) {
				const response = JSON.parse(xhr.responseText)
				if (!response.status) {
					alert('用户已删除!')
					window.location.reload()
				}
			}
		}
	}
	xhr.send(JSON.stringify({ userId }))
}
