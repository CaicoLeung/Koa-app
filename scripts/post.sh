# shellcheck disable=SC2034
base_url='http://localhost:3000/user/register'
git --version
echo curl -d "name=caico&age=25" ${base_url}
curl -d "name=caico&age=25" ${base_url}
