export function filterChars(originStr){
    return originStr.replace(/[&<>'"]/g, '');
}