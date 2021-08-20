import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyngStorage from '@react-native-async-storage/async-storage';


//buscar links salvos
export async function getLinkSave(key) {
    const myLinks = await AsyngStorage.getItem(key);

    let linkSaves = JSON.parse(myLinks) || [];

    return linkSaves;
}


//salvar links
export async function linkSave(key, newLink) {
    let linksStored = await getLinkSave(key);

    //Se tiver algum link salvo com esse id ou link duplicado, ignore
    const hasLink = linksStored.some(Link => Link.id === newLink.id);

    if (hasLink) {
        alert('Esse link já existe na lista!')
        return;
    }

    linksStored.push(newLink)
    await AsyngStorage.setItem(key, JSON.stringify(linksStored))

}


//excluir links
export async function linkDelete(Links, id) {
    let myLinks = Links.filter((item) => {
        return (item.id !== id)
    })

    await AsyncStorage.setItem('links', JSON.stringify(myLinks));
    console.log('DELETADO');
    return myLinks;


}