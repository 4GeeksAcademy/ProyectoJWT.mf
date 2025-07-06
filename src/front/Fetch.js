export const get_user = async () => {
    const resp = await fetch('https://curly-space-rotary-phone-5gr6vxrq457pcvvrr-3001.app.github.dev/api/user')
    const data = await resp.json()
    console.log(data)
    return data
} 