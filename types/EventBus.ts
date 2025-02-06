import mitt from "mitt";

type Events = {
  itemClicked: string;
};

const eventBus = mitt<Events>();

export default eventBus;