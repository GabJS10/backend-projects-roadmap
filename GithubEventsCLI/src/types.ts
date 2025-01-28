export enum EventType {
    PushEvent = 'PushEvent',
    WatchEvent = 'WatchEvent',
    IssuesEvent = 'IssuesEvent',
    IssueCommentEvent = 'IssueCommentEvent',
    DeleteEvent = 'DeleteEvent',
    ForkEvent = 'ForkEvent',
}


type Actor = {
    display_login: 'GabJS10',
}

type Repo = {
    name: string
}

type Payload = {
    [key: string]: any}

type Event = {
    id: string,
    type: EventType,
    actor: Actor,
    repo: Repo,
    payload: Payload,
    created_at: string
}

export default Event;