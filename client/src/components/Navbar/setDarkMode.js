export function lightTheme(){
    document.documentElement.style.setProperty('--primary', '#22262a')
    document.documentElement.style.setProperty('--background', 'rgb(255, 255, 255)')
    document.documentElement.style.setProperty('--text', 'black')
    document.documentElement.style.setProperty('--accent', '#EC255A')
    document.documentElement.style.setProperty('--link', '#0645AD')
    document.documentElement.style.setProperty('--cardBackground', 'rgb(226, 226, 226)')
    document.documentElement.style.setProperty('--cardBorder', '--cardBorder')
}

export function darkTheme(){
    document.documentElement.style.setProperty('--primary', '#22262a')
    document.documentElement.style.setProperty('--background', 'rgb(31, 31, 31)')
    document.documentElement.style.setProperty('--text', 'rgb(255, 255, 255)')
    document.documentElement.style.setProperty('--accent', '#EC255A')
    document.documentElement.style.setProperty('--link', 'var(--text)')
    document.documentElement.style.setProperty('--cardBackground', '#22262a')
    document.documentElement.style.setProperty('--cardBorder', '0.5px solid white')
}


