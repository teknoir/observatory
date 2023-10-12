import Fetch from "services/fetch";
import API from "enums/api";

export const fetchEvents = () => Fetch.get(API.events);
