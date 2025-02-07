import mitt from "mitt";

type Events = {
  itemClicked: boolean;
};

const EventBus = mitt<Events>();

export default EventBus;