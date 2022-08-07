public with sharing class FileManagementService {
  public static void changeContentDocumentLinkedEntity(
    String documentId,
    String oldLinkedEntity,
    String newLinkedEntity
  ) {
    System.debug('SELECT ID, ContentDocumentid, LinkedEntityid FROM ContentDocumentLink WHERE LinkedEntityid = '+oldLinkedEntity+
      ' AND ContentDocumentid = '+documentId);
    ContentDocumentLink documentLink = [
      SELECT ID, ContentDocumentid, LinkedEntityid
      FROM ContentDocumentLink
      WHERE
        LinkedEntityid = :oldLinkedEntity
        AND ContentDocumentid = :documentId
        AND ShareType ='V' //Apparently there is another one with share type I that can't be deleted
    ];
    if (documentLink != null) {
      delete documentLink;
      ContentDocumentLink newDocumentLink = documentLink.clone();
      newDocumentLink.LinkedEntityid = newLinkedEntity;
      insert newDocumentLink;
    }
  }
}
