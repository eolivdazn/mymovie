export function findDuplicates (array){
    return  array.filter((item, index) => array.indexOf(item) !== index)
}
