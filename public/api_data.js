define({ "api": [
  {
    "type": "test",
    "url": "/test",
    "title": "",
    "version": "0.0.0",
    "filename": "src/config/express.ts",
    "group": "/Users/edgargagocarrillo/Desktop/Nuwe/technologies/src/config/express.ts",
    "groupTitle": "/Users/edgargagocarrillo/Desktop/Nuwe/technologies/src/config/express.ts",
    "name": "TestTest"
  },
  {
    "type": "post",
    "url": "/tech/withImage",
    "title": "Add with image",
    "description": "<p>Add a new database object + upload the Technology image to AWS</p>",
    "name": "AddImageLogo",
    "group": "Technologies",
    "permission": [
      {
        "name": "public"
      }
    ],
    "version": "0.0.0",
    "filename": "src/technology/application/router.ts",
    "groupTitle": "Technologies"
  },
  {
    "type": "post",
    "url": "/tech",
    "title": "Add Technology",
    "description": "<p>Add the database object using the id</p>",
    "name": "AddTechnology",
    "group": "Technologies",
    "permission": [
      {
        "name": "public"
      }
    ],
    "version": "0.0.0",
    "filename": "src/technology/application/router.ts",
    "groupTitle": "Technologies"
  },
  {
    "type": "get",
    "url": "/tech/bulk",
    "title": "Upload bulk technologies",
    "description": "<p>Uploads a list of technologies and creates the object at mongo</p>",
    "name": "BulkUpload",
    "group": "Technologies",
    "permission": [
      {
        "name": "public"
      }
    ],
    "version": "0.0.0",
    "filename": "src/technology/application/router.ts",
    "groupTitle": "Technologies"
  },
  {
    "type": "delete",
    "url": "/tech/{id}",
    "title": "Delete Technology",
    "description": "<p>Deleted the database object using the id</p>",
    "name": "DeleteTechnology",
    "group": "Technologies",
    "permission": [
      {
        "name": "public"
      }
    ],
    "version": "0.0.0",
    "filename": "src/technology/application/router.ts",
    "groupTitle": "Technologies"
  },
  {
    "type": "get",
    "url": "/tech/find/all",
    "title": "Find all",
    "description": "<p>Returns all the database objects</p>",
    "name": "GetTechnologies",
    "group": "Technologies",
    "permission": [
      {
        "name": "public"
      }
    ],
    "version": "0.0.0",
    "filename": "src/technology/application/router.ts",
    "groupTitle": "Technologies"
  },
  {
    "type": "get",
    "url": "/tech/:fileKey",
    "title": "Find Technology file",
    "description": "<p>Returns the requested file using the fileKey(name)</p>",
    "name": "GetTechnology",
    "group": "Technologies",
    "permission": [
      {
        "name": "public"
      }
    ],
    "version": "0.0.0",
    "filename": "src/technology/application/router.ts",
    "groupTitle": "Technologies"
  },
  {
    "type": "get",
    "url": "/tech/find/:id",
    "title": "Find by Id",
    "description": "<p>Returns the database object looking by the id</p>",
    "name": "GetTechnology",
    "group": "Technologies",
    "permission": [
      {
        "name": "public"
      }
    ],
    "version": "0.0.0",
    "filename": "src/technology/application/router.ts",
    "groupTitle": "Technologies"
  },
  {
    "type": "patch",
    "url": "/tech/{id}",
    "title": "Upadte Technology",
    "description": "<p>Upadate the database object using the id</p>",
    "name": "Upadate",
    "group": "Technologies",
    "permission": [
      {
        "name": "public"
      }
    ],
    "version": "0.0.0",
    "filename": "src/technology/application/router.ts",
    "groupTitle": "Technologies"
  },
  {
    "type": "get",
    "url": "/get",
    "title": "Get all technology enums",
    "name": "GetTechnologyEnums",
    "group": "Technology",
    "description": "<p>Get all technology enums</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "type",
            "optional": false,
            "field": "key",
            "description": "<p>can be tags, types, categories</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/technology/application/router.ts",
    "groupTitle": "Technology"
  }
] });
