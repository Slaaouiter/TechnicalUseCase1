@isTest
private with sharing class FileManagementServiceTest {
  @isTest
  public static void changeContentDocumentLinkedEntity_changes_the_linked_entity() {
    //Given
    String contentVersionId = TestDataFactory.createContentVersion(
      'SampleTitle',
      'SampleTitle.jpg'
    ); // this create a contentDocument and contentDocumentLink
    ContentVersion contentVersion = [
      SELECT Id, contentDocumentId
      FROM ContentVersion
      WHERE Id = :contentVersionId
    ];
    String contentDocumentId = contentVersion.ContentDocumentId;
    String linkedEntity = UserInfo.getUserId();
    String newLinkedEntity = TestDataFactory.createMovie('The tester', '404');

    //When
    Test.startTest();
    FileManagementService.changeContentDocumentLinkedEntity(
      contentDocumentId,
      linkedEntity,
      newLinkedEntity
    );
    Test.stopTest();

    //Then
    ContentDocumentLink contentDocumentLink = [
      SELECT LinkedEntityid, contentDocumentId
      FROM ContentDocumentLink
      WHERE LinkedEntityid = :newLinkedEntity
    ];
    System.assertEquals(
      (String) contentDocumentLink.LinkedEntityid,
      newLinkedEntity
    );
    System.assertEquals(
      (String) contentDocumentLink.ContentDocumentid,
      contentDocumentId
    );
  }
}
