import { Comments } from "@/components/Comments";
import CommentInput from "@/components/Pages/MiradorDetail/CommentInput";
import CreatorInfo from "@/components/Pages/MiradorDetail/CreatorInfo";
import ErrorState from "@/components/Pages/MiradorDetail/ErrorState";
import LoadingState from "@/components/Pages/MiradorDetail/LoadingState";
import LocationInfo from "@/components/Pages/MiradorDetail/LocationInfo";
import MiradorDetailHeader from "@/components/Pages/MiradorDetail/MiradorDetailHeader";
import SocialActions from "@/components/Pages/MiradorDetail/SocialActions";
import ZoomableImage from "@/components/Pages/MiradorDetail/ZoomableImage";
import { useMiradorDetail } from "@/components/Pages/MiradorDetail/useMiradorDetail";
import { colors } from "@/utils/theme";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function MiradorDetail() {
  const {
    miradorData,
    currentUser,
    isOwner,
    isLoading,
    isLoadingSocial,
    error,
    commentText,
    setCommentText,
    isLiked,
    isFavorited,
    likesCount,
    commentsCount,
    comments,
    handleEdit,
    handleSendComment,
    handleLike,
    handleFavorite,
    loadComments,
    handleRetry,
    timeAgo,
    handleDelete,
  } = useMiradorDetail();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !miradorData) {
    return <ErrorState error={error || ""} onRetry={handleRetry} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <MiradorDetailHeader
          title={miradorData.title}
          isOwner={isOwner}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <LocationInfo
          city={miradorData.city}
          country={miradorData.country}
          timeAgo={timeAgo()}
          miradorData={miradorData}
        />

        <ZoomableImage
          imageUrl={miradorData.imageUrl}
          style={styles.mainImage}
        />

        <CreatorInfo user={miradorData.user} />

        <Text style={styles.description}>{miradorData.description}</Text>

        <SocialActions
          isLiked={isLiked}
          isFavorited={isFavorited}
          likesCount={likesCount}
          commentsCount={commentsCount}
          isLoadingSocial={isLoadingSocial}
          onLike={handleLike}
          onFavorite={handleFavorite}
        />

        {comments.length > 0 && (
          <View style={styles.commentsSection}>
            <Comments
              comments={comments}
              isLoading={false}
              onRefresh={loadComments}
            />
          </View>
        )}
      </ScrollView>

      <CommentInput
        commentText={commentText}
        setCommentText={setCommentText}
        onSendComment={handleSendComment}
        isLoadingSocial={isLoadingSocial}
        currentUser={currentUser}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingTop: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginBottom: 24,
  },
  description: {
    color: colors.text.primary,
    fontSize: 18,
    lineHeight: 26,
    paddingHorizontal: 24,
    marginBottom: 32,
    letterSpacing: -0.3,
  },
  commentsSection: {
    marginBottom: 32,
  },
});
