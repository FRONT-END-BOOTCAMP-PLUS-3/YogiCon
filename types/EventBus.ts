import mitt from "mitt";

type Events = {
  itemClicked: string;
};

const EventBus = mitt<Events>();

export default EventBus;