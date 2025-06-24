import ApiExport from '@core/control/api-export'

@ApiExport
export default class ExportApi {
  async getName(p: any, c: any) {
    return { name: 12 }
  }
}
