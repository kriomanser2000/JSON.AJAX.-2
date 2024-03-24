var defaultText = "Type [/] to search                                                   | >_";

        function clearInput() {
            var input = document.getElementById("searchInput");
            if (input.value === defaultText) {
                input.value = "";
            }
        }

        function restoreInput() {
            var input = document.getElementById("searchInput");
            if (input.value === "") {
                input.value = defaultText;
            }
        }

        function handleKeyPress(event) {
            if (event.keyCode === 13) {
                getUserInfo();
            }
        }

        function getUserInfo() {
            const username = document.getElementById('searchInput').value.trim();
            if (username === '') {
                alert('Please enter a username.');
                return;
            }
            fetch(`https://api.github.com/users/${username}`)
                .then(response => response.json())
                .then(data => {
                    const userInfo = document.getElementById('user-info');
                    userInfo.innerHTML = `
                        <img src="${data.avatar_url}" alt="Avatar">
                        <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
                        <p><strong>Login:</strong> ${data.login || 'N/A'}</p>
                        <p><strong>Github:</strong> <a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
                        <p><strong>Blog:</strong> ${data.blog || 'N/A'}</p>
                        <p><strong>Location:</strong> ${data.location || 'N/A'}</p>
                        <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
                        <p><strong>Followers:</strong> ${data.followers || 'N/A'}</p>
                        <p><strong>Following:</strong> ${data.following || 'N/A'}</p>
                    `;
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    const userInfo = document.getElementById('user-info');
                    userInfo.innerHTML = '<p>Failed to fetch user data. Please try again later.</p>';
                });
        }