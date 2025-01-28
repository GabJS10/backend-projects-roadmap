import Event , { EventType } from "./types";
 
const getUsername = () => {
    return process.argv.slice(2)[0];
}


function main() {
const username = getUsername();
  fetch(`https://api.github.com/users/${username}/events`)
  .then(response => {
    if (response.status !== 200) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
  })
    .then((data:Event[]) => {
        
       data.forEach((event:Event) => {


        switch (event.type) {
            case EventType.PushEvent:
                    console.log( `Pushed ${event.payload["commits"].length} commits to ${event.repo.name} at ${new Date(event.created_at).toLocaleString()}`);
                    
                break;

            case EventType.DeleteEvent:

                console.log(`Deleted ${event.payload["ref"]} at ${event.repo.name} at ${new Date(event.created_at).toLocaleString()}`);
                
                break;

            case EventType.IssueCommentEvent:
                console.log(`Commented on issue ${event.payload["issue"].number} on ${event.repo.name} at ${new Date(event.created_at).toLocaleString()}`);
                
                break;

            case EventType.WatchEvent:
                console.log(`Starred ${event.repo.name} at ${new Date(event.created_at).toLocaleString()}`);
                break;

            case EventType.IssuesEvent: 
                console.log(`Opened issue ${event.payload["issue"].number} on ${event.repo.name} at ${new Date(event.created_at).toLocaleString()}`);

                break;
            
            case EventType.ForkEvent:
                console.log(`Forked ${event.repo.name} at ${new Date(event.created_at).toLocaleString()}`);
                break;
        
            default:
                break;
        }

       });
       

       

    }).catch((error:ErrorConstructor) => {
        console.log(error.toString());
        
    });
}

main();
