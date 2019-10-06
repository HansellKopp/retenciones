import { DATA_TYPE } from 'jsstore' // IDataBase, /, ITable

export const tblWithholdings = {
  name: 'Withholdings',
  columns: {
    id: {
      primaryKey: true,
      autoIncrement: true
    },
    number: {
      notNull: true,
      dataType: DATA_TYPE.int
    },
    rif: {
      notNull: true,
      dataType: DATA_TYPE.String
    },
    name: {
      dataType: DATA_TYPE.String
    },
    period: {
      dataType: DATA_TYPE.number
    },
    date: {
      dataType: DATA_TYPE.DateTime
    },
    operation_type: {
      dataType: DATA_TYPE.String
    },
    type: {
      dataType: DATA_TYPE.String
    },
    tax_base: {
      dataType: DATA_TYPE.number
    },
    tax_withheld: {
      dataType: DATA_TYPE.number
    },
    vaucher: {
      dataType: DATA_TYPE.String
    },
    exempt_amount: {
      dataType: DATA_TYPE.number
    },
    aliquot: {
      dataType: DATA_TYPE.number
    },
    vat_amount: {
      dataType: DATA_TYPE.number
    },
    vaucher_date: {
      dataType: DATA_TYPE.DateTime
    },
    fortnight: {
      dataType: DATA_TYPE.number
    },
    percentage: {
      dataType: DATA_TYPE.number
    },
    credit_note: {
      dataType: DATA_TYPE.String
    },
    debit_note: {
      dataType: DATA_TYPE.String
    }
  }
}

/*
[Id] nvarchar(20) NOT NULL
, [NumeroDeOperacion] int NULL
, [CedulaRif] nvarchar(10) NULL
, [NombreRazonSocial] nvarchar(150) NULL
, [PeriodoImpositivo] nvarchar(6) NULL
, [FechaDocumento] datetime NULL
, [Operation type] nvarchar(1) NULL
, [TipoDocumento] nvarchar(2) NULL
, [RifAgenteRetencion] nvarchar(10) NULL
, [NumeroDocumento] nvarchar(20) NULL
, [NumeroControlDocumento] nvarchar(20) NULL
, [MontoDocumento] float NULL
, [BaseImponible] float NULL
, [MontoIvaRetenido] float NULL
, [NumeroDocumentoAfectado] nvarchar(20) NULL
, [NumeroComprobante] nvarchar(14) NULL
, [MontoExentoIva] float NULL
, [Alicuota] float NULL
, [NumeroExpediente] nvarchar(15) NULL
, [MontoIva] float NULL
, [FechaComprobante] datetime NULL
, [Periodo] nvarchar(100) NULL
, [PorcentajeRetencion] float NULL
, [NotaCredito] nvarchar(20) NULL
, [NotaDebito] nvarchar(20) NULL
, [Sustraendo] float NULL
*/
