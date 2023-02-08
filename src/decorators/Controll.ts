
export interface Route{
  path: string,
  handler: Function
}


export const routes: {controller: object, methods: Route[]} = {
  controller: null,
  methods: []
}

const Controll: ClassDecorator = function(target: object){
  console.log(routes.controller);
  
  for (const item of routes.methods) {
      console.log(item);
      
  }
}

export default Controll