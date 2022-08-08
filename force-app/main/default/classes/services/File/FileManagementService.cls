public with sharing class FileManagementService {
  public static void changeContentDocumentLinkedEntity(
    String documentId,
    String oldLinkedEntity,
    String newLinkedEntity
  ) {
    ContentDocumentLink documentLink = [
      SELECT ID, ContentDocumentid, LinkedEntityid
      FROM ContentDocumentLink
      WHERE
        LinkedEntityid = :oldLinkedEntity
        AND ContentDocumentid = :documentId 
    ];
    if (documentLink != null) {
      // delete documentLink; //Apparently the documentLink created by the standard file input component has a ShareType of I --> It cannot be deleted FIELD_INTEGRITY_EXCEPTION;
      //Maybe a solution would be to create a custom component and use ShareType = V
      ContentDocumentLink newDocumentLink = documentLink.clone();
      newDocumentLink.LinkedEntityid = newLinkedEntity;
      insert newDocumentLink;
    }
  }
}
